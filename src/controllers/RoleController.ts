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

export async function CreateRole(req: Request, res: Response) {
  try {
    const role = await prisma.role.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        permission: JSON.stringify(req.body.permission),
      },
    });
    if (role) {
      res.status(201).json({
        statusCode: 201,
        message: "Role has been created",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function UpdateRole(req: Request, res: Response) {
  try {
    const update = await prisma.role.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        permission: JSON.stringify(req.body.permission),
      },
    });
    if (update) {
      res.status(200).json({
        message: `${update.name} role has been Updated.`,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(422).json({
        message: `${req.body.name} role update failed.`,
        success: false,
        statusCode: 422,
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

export async function DeleteRole(req: Request, res: Response) {
  try {
    const del = await prisma.role.delete({
      where: {
        id: req.params.name,
      },
    });
    if (del) {
      res.status(200).json({
        message: `${del.name} role has been deleted.`,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(422).json({
        message: `${req.body.name} role delete failed.`,
        success: false,
        statusCode: 422,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
    });
  }
}

// ----------------------------------------------------------------------

export async function RoleSearchMany(req: Request, res: Response) {
  try {
    const searchRoles = await RoleSearchManyParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchRoles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function RoleSearch(req: Request, res: Response) {
  try {
    const searcRole = await RoleSearchParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searcRole,
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

export async function RoleSearchManyParams(searchParams: any) {
  try {
    const searchRoles = await prisma.role.findMany({
      ...searchParams,
    });
    return searchRoles;
  } catch (error) {
    return error;
  }
}

export async function RoleSearchParams(searchParams: any) {
  try {
    const searchRole = await prisma.role.findFirst({
      ...searchParams,
    });
    return searchRole;
  } catch (error) {
    return error;
  }
}
