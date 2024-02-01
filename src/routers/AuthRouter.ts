import { Router } from "express";
// import { body } from "express-validator";
import { Signin } from "../controllers/AuthController";

export const AuthRouter = Router();

AuthRouter.post("/signin", Signin);
