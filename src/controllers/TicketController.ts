import { Request, Response } from "express";
import prisma from "../lib/prisma";
import moment from "moment";

export async function GenerateTicketNumber(req: Request, res: Response) {
  try {
    const currentDate = moment();
    const currentYear = currentDate.format("YYYY");
    const currentMonth = currentDate.format("MM");
    const currentTicket = await prisma.ticket.findFirst({
      orderBy: { ticketNumber: "desc" },
      select: { ticketNumber: true },
    });

    let latestTicketNumber;

    if (currentTicket?.ticketNumber) {
      const lastMonth = currentTicket.ticketNumber.substring(0, 2);
      const lastYear = currentTicket.ticketNumber.substring(2, 6);
      const lastIncrement = currentTicket.ticketNumber.substring(6);

      if (lastMonth === currentMonth && lastYear === currentYear) {
        const newIncrement = (parseInt(lastIncrement, 10) + 1)
          .toString()
          .padStart(5, "0");
        latestTicketNumber = `${lastMonth}${lastYear}${newIncrement}`;
      } else {
        latestTicketNumber = `${currentMonth}${currentYear}00001`;
      }
    } else {
      latestTicketNumber = `${currentMonth}${currentYear}00001`;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Success",
      data: latestTicketNumber,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function GetAllTickets(req: Request, res: Response) {
  try {
    const tickets = await TicketSearchManyParams({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        responsiblePerson: { select: { id: true, fullName: true } },
        createdBy: { select: { id: true, fullName: true } },
        participants: { select: { id: true, fullName: true } },
        project: { select: { id: true, name: true } },
      },
    });
    if (tickets) {
      res.status(200).json({
        success: true,
        message: "success",
        statusCode: 200,
        data: tickets,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tickets Not Found",
        statusCode: 404,
      });
    }
  } catch (error) {
    console.error("Error Fetching tickets:", error);
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function CreateTicket(req: Request, res: Response) {
  try {
    const { id, createdById, status, participantIds, ...others } = req.body;
    await prisma.ticket.create({
      data: {
        ...others,
        status: "pending",
        createdById: req.user.id,
        participantIds: participantIds.map(
          (participant: { id: string }) => participant.id
        ),
      },
    });

    res.status(201).json({
      statusCode: 201,
      message: "Ticket has been created",
      success: true,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Errror",
      statusCode: 500,
    });
  }
}

// ----------------------------------------------------------------------

export async function TicketSearchMany(req: Request, res: Response) {
  try {
    const searchTickets = await TicketSearchManyParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchTickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}

export async function TicketSearch(req: Request, res: Response) {
  try {
    const searchTicket = await TicketSearchParams(req.body.filters);
    res.status(200).send({
      success: true,
      message: "Success",
      statusCode: 200,
      data: searchTicket,
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

export async function TicketSearchManyParams(searchParams: any) {
  try {
    const searchTickets = await prisma.ticket.findMany({
      ...searchParams,
    });
    return searchTickets;
  } catch (error) {
    return error;
  }
}

export async function TicketSearchParams(searchParams: any) {
  try {
    const searchTicket = await prisma.ticket.findFirst({
      ...searchParams,
    });
    return searchTicket;
  } catch (error) {
    return error;
  }
}
