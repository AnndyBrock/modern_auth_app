import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { registerSchema, loginSchema } from "./auth.schemas";

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
