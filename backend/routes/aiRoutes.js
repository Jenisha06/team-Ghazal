import express from "express";

import {

    analyzeCurrentTicket

} from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze/:ticket_id", analyzeCurrentTicket);

export default router;