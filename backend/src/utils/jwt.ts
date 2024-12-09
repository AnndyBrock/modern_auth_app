import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";


export type RefreshTokenPayload = {
    sessionId: SessionDocument["_id"];
}

export type AccessTokenPayload = {
    userId: UserDocument["_id"];
    sessionId: SessionDocument["_id"];
}

type SignTokenOptions = SignOptions &  {
    secret: string
}

const defaults: SignOptions = {
    audience: ["user"]
};

const accessTokenSignOptions: SignTokenOptions = {
    expiresIn: "15m",
    secret: JWT_SECRET
};

export const refreshTokenSignOptions: SignTokenOptions = {
    expiresIn: "30d",
    secret: JWT_REFRESH_SECRET
};

export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options?: SignTokenOptions
) => {
    const { secret, ...signOptions } = options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
        ...defaults,
        ...signOptions
    });
};
