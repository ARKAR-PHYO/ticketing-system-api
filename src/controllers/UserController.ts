import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { hashedPassword } from "../helpers";

export async function GetAllUsers(req: Request, res: Response) {
  try {
    const searchParameters = {
      orderBy: {
        createdAt: "desc",
      },
    };
    const users = await UserSearchManyParams(searchParameters);
    if (users) {
      res.status(200).json({
        message: "success",
        statusCode: 200,
        data: users,
        success: true,
      });
    } else {
      res.status(404).json({
        message: "Record Not Found.",
        statusCode: 404,
        success: false,
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

export async function CreateUser(req: Request, res: Response) {
  try {
    const userData: {
      fullName: string;
      userName: string;
      email: string;
      password: string;
      mobileNumber: string;
      profileImage?: string;
      roleName: string;
    } = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword(req.body.password),
      mobileNumber: req.body.mobileNumber,
      profileImage: "",
      roleName: req.body.roleName,
    };

    const user = await prisma.users.create({
      data: userData,
    });
    if (user) {
      res.status(201).json({
        statusCode: 201,
        message: "User Create Success.",
        success: true,
      });
    } else {
      res.status(422).json({
        statusCode: 422,
        message: "User Create Fail",
        success: false,
      });
    }
  } catch (error: any) {
    if (error.code === "P2002" && error.meta.target.includes("userName")) {
      res.status(409).json({
        statusCode: 409,
        message: "Username already exists.",
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        statusCode: 500,
        success: false,
      });
    }
  }
}

export async function UpdateUser(req: Request, res: Response) {
  try {
    const userData: {
      fullName: string;
      userName: string;
      email: string;
      mobileNumber: string;
      profileImage?: string;
      roleName: string;
    } = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      profileImage: "",
      roleName: req.body.roleName,
    };

    const update = await prisma.users.update({
      where: { id: req.params.id },
      data: {
        ...userData,
      },
    });
    if (update) {
      res.status(200).json({
        message: "User Update Successful",
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(200).json({
        message: "User Update Failed",
        success: false,
        statusCode: 400,
      });
    }
  } catch (error: any) {
    console.log("error =>", error);
    if (error.code === "P2002" && error.meta.target.includes("userName")) {
      res.status(200).json({
        statusCode: 409,
        message: "Username already exists.",
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
        statusCode: 500,
      });
    }
  }
}

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const delUser = await prisma.users.delete({
      where: {
        id: req.params.id,
      },
    });
    if (delUser) {
      res.status(200).json({
        statusCode: 200,
        message: `User ${delUser.fullName} has been deleted`,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
};
// ----------------------------------------------------------------------

export async function UserSearchMany(req: Request, res: Response) {
  try {
    const searchUsers = await UserSearchManyParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function UserSearch(req: Request, res: Response) {
  try {
    const searchUser = await UserSearchParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

// ----------------------------------------------------------------------
// COMMON FUNCTIONS

export async function UserSearchManyParams(searchParams: any) {
  try {
    const searchUsers = await prisma.users.findMany({
      ...searchParams,
    });
    return searchUsers;
  } catch (error) {
    return error;
  }
}

export async function UserSearchParams(searchParams: any) {
  try {
    const searchUser = await prisma.users.findFirst({
      ...searchParams,
    });
    return searchUser;
  } catch (error) {
    return error;
  }
}
