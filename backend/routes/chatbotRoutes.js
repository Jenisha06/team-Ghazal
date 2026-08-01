import express from "express";
import { chatWithAdmin } from "../controllers/chatbotController.js";

const router = express.Router();

// POST /chat
router.post("/chat", chatWithAdmin);

export default router;