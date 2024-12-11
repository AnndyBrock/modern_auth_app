import { Router } from "express";

import {
    getUserHandler,
} from "../controllers/user.controlle";

const authRoute = Router();

authRoute.get("/", getUserHandler);

export default authRoute;
