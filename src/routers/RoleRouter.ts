import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import { GetRole } from "../controllers/RoleController";

export const RoleRouter = Router();

RoleRouter.get("/:name", IsAuthenticated, GetRole);
