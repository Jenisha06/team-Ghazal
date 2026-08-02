import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    analyzeCurrentTicket,
    getChatHistory,
    chatWithAiEngine,
    clearChatHistory
} from "../controllers/aiController.js";

const router = express.Router();

// 1. Literal Chatbot JSONB endpoints (MUST be defined before /analyze/:ticket_id to prevent "chat" being parsed as ticket_id)
router.get("/chat-history", verifyToken, getChatHistory);
router.get("/analyze/chat-history", verifyToken, getChatHistory);

router.post("/chat", verifyToken, chatWithAiEngine);
router.post("/analyze/chat", verifyToken, chatWithAiEngine);

router.delete("/chat-history", verifyToken, clearChatHistory);
router.delete("/analyze/chat-history", verifyToken, clearChatHistory);

// 2. Dynamic Ticket AI Analysis Parameter Route (e.g. /analyze/T0140)
router.post("/analyze/:ticket_id", async (req, res) => {
    try {
        const { ticket_id } = req.params;

        // Guard against literal "chat" falling through
        if (ticket_id === "chat") {
            return chatWithAiEngine(req, res);
        }

        const result = await analyzeCurrentTicket(ticket_id);

        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;