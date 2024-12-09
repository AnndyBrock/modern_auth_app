import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controlle";

const authRoute = Router();

// prefix /auth

authRoute.post("/register", registerHandler);
authRoute.post("/login", loginHandler);


export default authRoute;
