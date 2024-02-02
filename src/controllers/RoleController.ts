import { Request, Response } from "express";
import prisma from "../lib/prisma";

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
  // try {
  //   console.log("req.body ==>", req.body);

  //   const role = await prisma.role.findFirst({
  //     where: {
  //       name: req.body.name,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  //   if (role) {
  //     res.status(200).json({
  //       statusCode: 200,
  //       success: true,
  //       message: "Success",
  //       role: { ...role, permission: JSON.parse(role.permission) },
  //     });
  //   } else {
  //     res.status(404).json({
  //       statusCode: 404,
  //       message: "Role Not Found",
  //       success: false,
  //     });
  //   }
  // } catch (error) {
  //   res.status(500).json({
  //     statusCode: 500,
  //     message: "Internal Server Error.",
  //     success: false,
  //   });
  // }
}
