import { Router } from "express";

import {
    getSessionHandler,
    deleteSessionHandler
} from "../controllers/session.controlle";

const authRoute = Router();

authRoute.get("/", getSessionHandler);
authRoute.delete("/:id", deleteSessionHandler);

export default authRoute;
