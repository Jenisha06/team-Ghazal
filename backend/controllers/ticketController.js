import { supabase } from "../config/supabase.js";
import { analyzeCurrentTicket } from "./aiController.js";

export const updateTicket = async (req, res) => {

    const { ticket_id } = req.params;

    const { technician_notes } = req.body;

    // Update technician notes and automatically close the ticket
    const { data, error } = await supabase
        .from("tickets")
        .update({
            technician_notes,
            status: "Closed"
        })
        .eq("ticket_id", ticket_id)
        .select()
        .single();

    if (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

    // Trigger AI Analysis
    await analyzeCurrentTicket(ticket_id);

    return res.status(200).json({

        success: true,

        message: "Ticket completed successfully.",

        data

    });

};