import cors from "cors";
import express from "express";
import { SERVER_DOMAIN, SERVER_PORT } from "./config/env-config";
// Routers
import { AuthRouter } from "./routers/AuthRouter";

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
