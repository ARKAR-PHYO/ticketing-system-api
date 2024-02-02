import { UserInterface } from "../user-interface";

export {};

declare module "express" {
  export interface Request {
    user?: any;
    userToken?: string;
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user?: UserInterface;
    resource?: string;
  }
}
