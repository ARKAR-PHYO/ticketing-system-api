import cors from "cors";
import express from "express";
import { SERVER_DOMAIN, SERVER_PORT } from "./config/env-config";
// Routers
import { AuthRouter } from "./routers/AuthRouter";
import { RoleRouter } from "./routers/RoleRouter";
import { UserRouter } from "./routers/UserRouter";
import { ProjectRouter } from "./routers/ProjectRouter";
import { TicketRouter } from "./routers/TicketRouter";
import { FCMRouter } from "./routers/FCMRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

/**
 * SERVER ENDPOINTS
 */
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://${SERVER_DOMAIN}:${SERVER_PORT}`);
});

/**
 * API ROUTES
 */
app.use("/api/auth", AuthRouter);
app.use("/api/role", RoleRouter);
app.use("/api/user", UserRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/ticket", TicketRouter);
app.use("/api/fcm", FCMRouter);
