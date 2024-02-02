import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import { GetRole, GetRoles } from "../controllers/RoleController";

export const RoleRouter = Router();

RoleRouter.get("/", IsAuthenticated, GetRoles);
RoleRouter.get("/:name", IsAuthenticated, GetRole);
