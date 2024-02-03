import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function GetAllProjects(req: Request, res: Response) {
  try {
    const searchParams = {
      orderBy: {
        createdAt: "desc",
      },
    };
    const project = await ProjectSearchManyParams(searchParams);
    if (project) {
      res.status(200).json({
        success: true,
        message: "success",
        statusCode: 200,
        data: project,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Project Not Found",
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

export async function CreateProject(req: Request, res: Response) {
  try {
    const project = await prisma.project.create({
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });
    res.status(200).send({
      success: true,
      message: "Projet Create Susccess",
      statusCode: 200,
      data: project,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Errror",
      statusCode: 500,
    });
  }
}

export async function UpdateProject(req: Request, res: Response) {
  try {
    const update = await prisma.project.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });
    if (update) {
      res.status(200).json({
        message: `${update.name} project has been Updated.`,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(422).json({
        message: `${req.body.name} project update failed.`,
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

export async function DeleteProject(req: Request, res: Response) {
  try {
    const del = await prisma.project.delete({
      where: {
        id: req.params.name,
      },
    });
    if (del) {
      res.status(200).json({
        message: `${del.name} project has been deleted.`,
        success: true,
        statusCode: 200,
      });
    } else {
      res.status(422).json({
        message: `${req.body.name} project delete failed.`,
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

export async function ProjectSearchMany(req: Request, res: Response) {
  try {
    const searchProjects = await ProjectSearchManyParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchProjects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function ProjectSearch(req: Request, res: Response) {
  try {
    const searchProject = await ProjectSearchParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchProject,
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

export async function ProjectSearchManyParams(searchParams: any) {
  try {
    const searchProjects = await prisma.project.findMany({
      ...searchParams,
    });
    return searchProjects;
  } catch (error) {
    return error;
  }
}

export async function ProjectSearchParams(searchParams: any) {
  try {
    const searchProject = await prisma.project.findFirst({
      ...searchParams,
    });
    return searchProject;
  } catch (error) {
    return error;
  }
}
