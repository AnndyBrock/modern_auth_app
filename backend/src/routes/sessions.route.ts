import { Router } from "express";

import {
    getSessionHandler,
} from "../controllers/session.controlle";

const authRoute = Router();

authRoute.get("/", getSessionHandler);

export default authRoute;
