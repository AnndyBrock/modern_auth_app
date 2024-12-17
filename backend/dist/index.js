"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const env_1 = require("./constants/env");
const http_1 = require("./constants/http");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const sessions_route_1 = __importDefault(require("./routes/sessions.route"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: env_1.APP_ORIGIN, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    return res.status(http_1.OK).json({ status: "Success" });
});
app.use("/auth", auth_route_1.default);
app.use("/user", authenticate_1.default, user_route_1.default);
app.use("/sessions", authenticate_1.default, sessions_route_1.default);
app.use(errorHandler_1.default);
// Start server
app.listen(env_1.PORT, async () => {
    console.log(`Server is running on port ${env_1.PORT}`);
    await (0, db_1.default)();
});
