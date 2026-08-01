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
    const analysis = await analyzeCurrentTicket(ticket_id);

    return res.status(200).json({

    success: true,

    message: "Ticket completed successfully.",

    data,

    analysis

});

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