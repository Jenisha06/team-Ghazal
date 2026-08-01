import { supabase } from "../config/supabase.js";

export const getTickets = async (req, res) => {

    const { data, error } = await supabase
        .from("tickets")
        .select("*");

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);

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

    res.json(data);

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

    res.status(201).json(data);

};

export const updateTicket = async (req, res) => {

    const { ticket_id } = req.params;

    const updates = req.body;

    const { data, error } = await supabase
        .from("tickets")
        .update(updates)
        .eq("ticket_id", ticket_id)
        .select();

    if (error) {

        return res.status(500).json({

            error: error.message

        });

    }

    res.json(data);

};