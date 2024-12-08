import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken';
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeType";
import { oneYearFromNow } from "../utils/data";
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import * as sea from "node:sea";

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

    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    });

    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent
    });

    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET, {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            sessionId: session._id,
            userId: user._id
        },
        JWT_SECRET, {
            audience: ["user"],
            expiresIn: "20m"
        }
    );

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

    const isValid = await user.comparePassword(data.password);

    appAssert(isValid, UNAUTHORIZED, "Invalid email or password" );

    const session = await SessionModel.create({
        userId :  user._id,
        userAgent: data.userAgent,
    });

    const sessionInfo = {
        sessionId: session._id
    };

    const refreshToken = jwt.sign(
        sessionInfo,
        JWT_REFRESH_SECRET, {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            ...sessionInfo,
            userId: user._id
        },
        JWT_SECRET, {
            audience: ["user"],
            expiresIn: "20m"
        }
    );

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
    };
};
