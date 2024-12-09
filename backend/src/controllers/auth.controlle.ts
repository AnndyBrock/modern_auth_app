import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser, refreshUserAccessToken } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    setAuthCookies
} from "../utils/cookies";
import { registerSchema, loginSchema } from "./auth.schemas";
import { verityToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";

export const registerHandler = catchErrors(async (req, res) => {
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"]
        });

        const { user, refreshToken, accessToken } = await createAccount(request);

        return setAuthCookies({ res, accessToken, refreshToken })
            .status(CREATED)
            .json(user);
    }
);

export const loginHandler = catchErrors(async (req, res) => {
    const request = loginSchema.parse({ ...req.body, userAgent: req.headers["user-agent"] });

    const { accessToken, refreshToken } = await loginUser(request);

    return setAuthCookies({ res, accessToken, refreshToken })
        .status(OK)
        .json({ message: "Login successful" });
});

export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken as string|undefined;
    const { payload } = verityToken(accessToken || "");

    if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }

    return clearAuthCookies(res).status(OK).json({
        message: "Logout Successfully"
    });
});

export const refreshHandler = catchErrors( async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string|undefined;

    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }

    return res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
        message: "Access token refreshed"
    });
});
