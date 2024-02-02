import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import {
  CreateRole,
  DeleteRole,
  GetRole,
  GetRoles,
  RoleSearch,
  RoleSearchMany,
  UpdateRole,
} from "../controllers/RoleController";

export const RoleRouter = Router();

RoleRouter.get("/", IsAuthenticated, GetRoles);
RoleRouter.get("/:name", IsAuthenticated, GetRole);
RoleRouter.post("/", IsAuthenticated, CreateRole);
RoleRouter.put("/", IsAuthenticated, UpdateRole);
RoleRouter.delete("/:name", IsAuthenticated, DeleteRole);

RoleRouter.post("/search-many", IsAuthenticated, RoleSearchMany);
RoleRouter.post("/search", IsAuthenticated, RoleSearch);
