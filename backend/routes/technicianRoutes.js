import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { supabase } from "../config/supabase.js";

const router = express.Router();

/**
 * GET /technician/tickets
 * Protected route for logged-in technicians to fetch their assigned tickets.
 * Uses req.user.engineer_id or req.user.name from JWT payload.
 */
router.get(
    "/tickets",
    verifyToken,
    async (req, res) => {
        try {
            const engineer_id = req.user?.engineer_id;
            const userName = req.user?.name;

            // If neither engineer_id nor name is available in JWT, return empty array
            if (!engineer_id && !userName) {
                return res.json([]);
            }

            let query = supabase.from("tickets").select("*");

            const numericEngineerId = engineer_id !== undefined && engineer_id !== null && !isNaN(Number(engineer_id))
                ? Number(engineer_id)
                : null;

            if (numericEngineerId !== null) {
                query = query.eq("engineer_id", numericEngineerId);
            } else if (userName) {
                query = query.ilike("engineer", `%${userName}%`);
            } else {
                return res.json([]);
            }

            const { data, error } = await query;

            if (error) {
                console.error("Technician tickets DB query error:", error);
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }

            return res.json(data || []);
        } catch (error) {
            console.error("Technician tickets route exception:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

export default router;