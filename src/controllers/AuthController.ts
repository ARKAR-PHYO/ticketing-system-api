import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { comparePassword, signinToken } from "../helpers";
import { CreateError } from "../helpers/errors";

export async function Signin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: req.body.email }, { userName: req.body.email }],
      },
      select: {
        id: true,
        fullName: true,
        userName: true,
        email: true,
        password: true,
        mobileNumber: true,
      },
    });
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "User Not Found",
        success: false,
      });
      return next(CreateError(404, "USER NOT FOUND !!"));
    }

    const isPasswordCorrect = comparePassword(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(CreateError(404, "PASSWORD INCORRECT."));
    const accessToken = signinToken({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      password: user.password,
      mobileNumber: user.mobileNumber,
    });
    if (accessToken) {
      const { password, ...others } = user;
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "success",
          data: others,
          accessToken,
        });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function MyProfile(req: Request, res: Response) {
  try {
    if (res.headersSent) {
      return;
    }
    const { id } = req.user;
    const profile = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    if (profile) {
      res.status(200).json({
        success: true,
        message: "Success",
        statusCode: 200,
        data: profile,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Profile not found",
        statusCode: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}
