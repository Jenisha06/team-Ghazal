import express from "express";

import {

    getTickets,

    getTicket,

    createTicket,

    updateTicket

} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getTickets);

router.get("/:ticket_id", getTicket);

router.post("/", createTicket);

router.patch("/:ticket_id", updateTicket);

export default router;