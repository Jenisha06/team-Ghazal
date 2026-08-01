import express from "express";
import {verifyToken} from "../middleware/authMiddleware.js";
import {getTickets} from "../controllers/ticketController.js";


import {

    getTicket,

    createTicket,

    updateTicket

} from "../controllers/ticketController.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    getTickets
);


router.get("/:ticket_id", verifyToken, getTicket);

router.post("/", createTicket);

router.patch("/:ticket_id", updateTicket);

export default router;