import { chatWithDatabase } from "../services/chatbotService.js";

export const chatWithAdmin = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required"
            });
        }

        const response = await chatWithDatabase(message);

        return res.status(200).json({
            success: true,
            response
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

};