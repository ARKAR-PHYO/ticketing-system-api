import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import {
  CreateProject,
  DeleteProject,
  GetAllProjects,
  ProjectSearch,
  ProjectSearchMany,
  UpdateProject,
} from "../controllers/ProjectController";

export const ProjectRouter = Router();

ProjectRouter.get("/", IsAuthenticated, GetAllProjects);
ProjectRouter.post("/", IsAuthenticated, CreateProject);
ProjectRouter.put("/", IsAuthenticated, UpdateProject);
ProjectRouter.delete("/:name", IsAuthenticated, DeleteProject);

ProjectRouter.post("/search-many", IsAuthenticated, ProjectSearchMany);
ProjectRouter.post("/search", IsAuthenticated, ProjectSearch);
