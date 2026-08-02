import { supabase } from "../config/supabase.js";
import { analyzeCurrentTicket } from "./aiController.js";

export const updateTicket = async (req, res) => {
    const { ticket_id } = req.params;
    const { technician_notes, status } = req.body;

    try {
        // Fetch existing ticket to check current status and created timestamp
        const { data: existingTicket, error: fetchError } = await supabase
            .from("tickets")
            .select("*")
            .eq("ticket_id", ticket_id)
            .single();

        if (fetchError || !existingTicket) {
            return res.status(404).json({
                success: false,
                error: `Ticket #${ticket_id} not found.`
            });
        }

        // Lock check: Once status is Closed, edits are strictly prohibited in DB
        if ((existingTicket.status || "").toLowerCase() === "closed") {
            return res.status(400).json({
                success: false,
                error: "Ticket is already Closed and locked in the database. Further updates are prohibited."
            });
        }

        const targetStatus = status || (existingTicket.status && existingTicket.status.toLowerCase() === "open" ? "In Progress" : (existingTicket.status || "In Progress"));
        const updatePayload = {
            technician_notes: technician_notes ?? existingTicket.technician_notes,
            status: targetStatus
        };

        // Calculate resolution time in minutes if closing ticket
        if (targetStatus.toLowerCase() === "closed") {
            const rawCreated = existingTicket.created_date || existingTicket.created_at || new Date();
            const startMs = new Date(rawCreated).getTime();
            const endMs = new Date().getTime();
            const diffMins = !isNaN(startMs) && endMs > startMs
                ? Math.max(1, Math.round((endMs - startMs) / (1000 * 60)))
                : 30;

            updatePayload.resolution_time = diffMins;
        }

        // Update ticket in Supabase database
        const { data: updatedTicket, error: updateError } = await supabase
            .from("tickets")
            .update(updatePayload)
            .eq("ticket_id", ticket_id)
            .select()
            .single();

        if (updateError) {
            return res.status(500).json({
                success: false,
                error: updateError.message
            });
        }

        // Trigger AI analysis pipeline if closing ticket
        let analysisResult = null;
        if (targetStatus.toLowerCase() === "closed") {
            try {
                analysisResult = await analyzeCurrentTicket(ticket_id);
                if (analysisResult?.analysis) {
                    const aiData = analysisResult.analysis;
                    await supabase
                        .from("tickets")
                        .update({
                            root_cause: aiData.root_cause,
                            repair_method: aiData.repair_method,
                            repair_type: aiData.repair_type,
                            preventive_action: aiData.preventive_action
                        })
                        .eq("ticket_id", ticket_id);
                }
            } catch (aiErr) {
                console.log("AI Analysis post-processing note:", aiErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: targetStatus.toLowerCase() === "closed"
                ? "Ticket completed and locked in database successfully."
                : "Technician notes saved successfully.",
            data: updatedTicket,
            analysis: analysisResult
        });
    } catch (err) {
        console.error("updateTicket exception:", err);
        return res.status(500).json({
            success: false,
            error: err.message || "Failed to update ticket"
        });
    }
};

export const getTickets = async (req, res) => {

    const { data, error } = await supabase
        .from("tickets")
        .select("*");

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.json(data);

};

export const getTicket = async (req, res) => {

    const { ticket_id } = req.params;

    const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("ticket_id", ticket_id)
        .single();

    if (error) {
        return res.status(404).json({
            error: "Ticket not found"
        });
    }

    return res.json(data);

};

export const createTicket = async (req, res) => {

    const ticket = req.body;

    const { data, error } = await supabase
        .from("tickets")
        .insert(ticket)
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.status(201).json(data);

};