import cors from "cors";
import express from "express";
import { createServer } from "http";
import { SERVER_DOMAIN, SERVER_PORT } from "./config/env-config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
const httpServer = createServer(app);

/**
 * SERVER ENDPOINTS
 */
httpServer.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://${SERVER_DOMAIN}:${SERVER_PORT}`);
});
