import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeType";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/data";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verityToken } from "../utils/jwt";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string
}

export const createAccount = async (data: CreateAccountParams) => {
    const existingUser = await UserModel.exists({
        email: data.email
    });

    appAssert(!existingUser, CONFLICT, "Email already in use");

    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    const userId = user._id;

    const verificationCode = await VerificationCodeModel.create({
        userId,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    });

    const session = await SessionModel.create({
        userId,
        userAgent: data.userAgent
    });

    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions);

    const accessToken = signToken({
        sessionId: session._id,
        userId
    });

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    };
};

export const loginUser = async (data: CreateAccountParams) => {
    const user = await UserModel.findOne({
        email: data.email
    });

    appAssert(user, UNAUTHORIZED, "Invalid email or password" );

    const userId = user._id;

    const isValid = await user.comparePassword(data.password);

    appAssert(isValid, UNAUTHORIZED, "Invalid email or password" );

    const session = await SessionModel.create({
        userId,
        userAgent: data.userAgent,
    });

    const sessionInfo = {
        sessionId: session._id
    };

    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

    const accessToken = signToken({
        ...sessionInfo,
        userId
    });

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
    const {
        payload
    } = verityToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenSignOptions.secret
    });
    appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();
    appAssert(
        session && session.expiresAt.getTime() > now,
        UNAUTHORIZED,
        "Session expired"
    );

    //Refresh session if it expires in the next 24 hours
    const sessionNeedRefresh = session.expiresAt.getTime() - now < ONE_DAY_MS;

    if (sessionNeedRefresh) {
        session.expiresAt = thirtyDaysFromNow();
        await session.save();
    }

    const newRefreshToken = sessionNeedRefresh ? signToken({
        sessionId: session._id,
    }, refreshTokenSignOptions) : undefined;

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id
    });

    return {
        accessToken,
        newRefreshToken
    };
};
