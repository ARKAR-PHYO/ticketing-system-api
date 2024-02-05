import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function CreateFCMToken(req: Request, res: Response) {
  try {
    const searchExistingToken = await prisma.fcmToken.findFirst({
      where: {
        userId: req.body.userId,
        userToken: req.userToken,
      },
    });
    if (!searchExistingToken) {
      const create = await prisma.fcmToken.create({
        data: {
          ...req.body,
          userToken: req.userToken,
        },
      });
      res.status(200).json({
        message: "Token Creation Successful",
        success: true,
        statusCode: 201,
        data: create,
      });
    } else {
      const update = await prisma.fcmToken.update({
        where: {
          id: searchExistingToken.id,
          userToken: req.userToken,
        },
        data: {
          fcmToken: req.body.fcmToken,
        },
      });
      res.status(200).json({
        message: "Token Creation Successful",
        success: true,
        statusCode: 201,
        data: update,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}

export async function UpdateFCMToken(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const update = await prisma.fcmToken.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });
    if (update) {
      res.status(200).json({
        message: "Token Update Successful",
        success: true,
        statusCode: 200,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}

export async function DeleteFCMToken(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const del = await prisma.fcmToken.delete({
      where: {
        id,
      },
    });
    if (del) {
      res.status(200).json({
        message: "Token Update Successful",
        success: true,
        statusCode: 200,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}

export async function SearchFCMToken(req: Request, res: Response) {
  const searchParams = req.body.filters;
  try {
    const FCMTokens = await prisma.fcmToken.findMany({
      ...searchParams,
      userToken: req.userToken,
    });
    res.status(200).json({
      message: "Token Search Successful",
      success: true,
      statusCode: 200,
      data: FCMTokens,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}
