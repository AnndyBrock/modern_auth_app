import { Router } from "express";

import {
    loginHandler,
    registerHandler,
    logoutHandler,
    refreshHandler,
    verifyEmailHandler
} from "../controllers/auth.controlle";

const authRoute = Router();


authRoute.post("/register", registerHandler);
authRoute.post("/login", loginHandler);
authRoute.get("/logout", logoutHandler);
authRoute.get("/refresh", refreshHandler);
authRoute.get("/email/verify/:code", verifyEmailHandler);

export default authRoute;
