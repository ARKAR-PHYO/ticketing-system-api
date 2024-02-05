import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import { CreateFCMToken, SearchFCMToken } from "../controllers/FCMController";

export const FCMRouter = Router();

FCMRouter.post("/search", IsAuthenticated, SearchFCMToken);
FCMRouter.post("/", IsAuthenticated, CreateFCMToken);
