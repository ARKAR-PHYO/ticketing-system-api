import { Router } from "express";
import { IsAuthenticated } from "../middlewares/auth";
import {
  CreateTicket,
  GenerateTicketNumber,
  GetAllTickets,
  TicketSearch,
  TicketSearchMany,
} from "../controllers/TicketController";

export const TicketRouter = Router();

TicketRouter.get("/ticket-number", IsAuthenticated, GenerateTicketNumber);
TicketRouter.get("/", IsAuthenticated, GetAllTickets);
TicketRouter.post("/", IsAuthenticated, CreateTicket);

TicketRouter.post("/search-many", IsAuthenticated, TicketSearchMany);
TicketRouter.post("/search", IsAuthenticated, TicketSearch);
