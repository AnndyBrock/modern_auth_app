import { Router } from "express";
import { registerHandler } from "../controllers/auth.controlle";

const authRoute = Router();

// prefix /auth

authRoute.post("/register", registerHandler);


export default authRoute;
