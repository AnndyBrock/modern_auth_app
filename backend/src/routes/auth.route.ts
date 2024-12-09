import { Router } from "express";
import { loginHandler, registerHandler, logoutHandler } from "../controllers/auth.controlle";

const authRoute = Router();

// prefix /auth

authRoute.post("/register", registerHandler);
authRoute.post("/login", loginHandler);
authRoute.get("/logout", logoutHandler);

export default authRoute;
