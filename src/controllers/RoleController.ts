import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function GetRoles(req: Request, res: Response) {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    if (roles) {
      res.status(200).json({
        success: true,
        message: "success",
        statusCode: 200,
        data: roles,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Role Not Found",
        statusCode: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function GetRole(req: Request, res: Response) {
  try {
    const get = await prisma.role.findFirst({
      where: {
        name: req.params.name,
      },
      include: {
        user: true,
      },
    });
    if (res.headersSent) {
      return;
    }
    if (get) {
      res.status(200).json({
        role: { ...get, permission: JSON.parse(get.permission) },
        success: true,
      });
    } else {
      throw new Error("Role Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
}
