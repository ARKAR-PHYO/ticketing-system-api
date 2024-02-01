import { config } from "dotenv";

config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const SERVER_PORT = process.env.SERVER_PORT || 8800;
export const SERVER_DOMAIN = process.env.SERVER_DOMAIN || "localhost";

export const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
export const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || "localhost";
