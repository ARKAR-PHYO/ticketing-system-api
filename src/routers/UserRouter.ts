import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  UpdateUser,
  UserSearch,
  UserSearchMany,
} from "../controllers/UserController";

export const UserRouter = Router();

UserRouter.get("/", IsAuthenticated, GetAllUsers);
UserRouter.post("/", IsAuthenticated, CreateUser);
UserRouter.post("/search-many", IsAuthenticated, UserSearchMany);
UserRouter.post("/search", IsAuthenticated, UserSearch);

UserRouter.put("/:id", IsAuthenticated, UpdateUser);

UserRouter.delete("/:id", IsAuthenticated, DeleteUser);
