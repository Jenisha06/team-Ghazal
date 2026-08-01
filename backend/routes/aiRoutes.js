import express from "express";
import { analyzeCurrentTicket } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze/:ticket_id", async (req, res) => {

    try {

        const result = await analyzeCurrentTicket(
            req.params.ticket_id
        );

        res.status(200).json({

            success: true,

            ...result

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

});

export default router;