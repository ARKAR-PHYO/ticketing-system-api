import { CreateError } from "./../helpers/errors";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env-config";

export const IsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader)
      return next(CreateError(401, "authHeader Not Found or ERROR"));

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken)
      next(CreateError(401, "accessToken Not found or ERROR !!"));

    verify(accessToken!, JWT_SECRET, (err, decoded) => {
      if (err)
        res.status(401).send({ statusCode: 401, success: false, error: err });
      req.user = decoded;
      req.userToken = accessToken;
    });
    next();
  } catch (error: any) {
    next(CreateError(500, error));
  }
};
