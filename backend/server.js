const express = require("express");
const supabase = require("./config/supabase");
const analyzeTicket = require("./services/aiService");

require("dotenv").config();

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("OpMemory Backend Running");
});


// Get all tickets
app.get("/tickets", async (req, res) => {

    const { data, error } = await supabase
        .from("tickets")
        .select("*");


    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }


    res.json(data);

});


// Get ticket by ticket_id
app.get("/tickets/:ticket_id", async (req, res) => {

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

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
//Post a new ticket

app.post("/tickets", async (req, res) => {

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

});

// Update a ticket by ticket_id
app.patch("/tickets/:ticket_id", async (req, res) => {

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

});

app.post("/analyze/:ticket_id", async (req, res) => {

    const { ticket_id } = req.params;


    // Fetch current ticket
    const { data: ticket, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("ticket_id", ticket_id)
        .single();


    if (error) {
        return res.status(404).json({
            error: "Ticket not found"
        });
    }


    try {

        // Extract keywords from issue
        const searchKeyword = ticket.issue
            .split(" ")
            .slice(0, 3)
            .join(" ");



        // Find similar historical tickets
        const { data: historicalTickets, error: historyError } = await supabase
            .from("tickets")
            .select("*")
            .ilike("issue", `%${searchKeyword}%`)
            .limit(10);



        if (historyError) {
            return res.status(500).json({
                error: historyError.message
            });
        }



        // Remove current ticket from results
        const similarTickets = historicalTickets.filter(
            item => item.ticket_id !== ticket.ticket_id
        );



        const similarCount = similarTickets.length;



        // Send ticket + history to AI
        const aiResponse = await analyzeTicket(
            ticket,
            similarTickets
        );


        // Convert AI response to JSON
        const analysis = JSON.parse(aiResponse);



        // Save AI analysis into Supabase
        const { error: saveError } = await supabase
            .from("ai_analysis")
            .insert({

                ticket_id: ticket.ticket_id,

                root_cause: analysis.root_cause,

                repair_method: analysis.repair_method,

                repair_type: analysis.repair_type,

                confidence_score: analysis.confidence_score,

                preventive_action: analysis.preventive_action,

                historical_pattern: analysis.historical_pattern,
                recommended_fix: analysis.recommended_fix,

                similar_tickets_found: similarCount



            });



        if (saveError) {

            return res.status(500).json({
                error: saveError.message
            });

        }



        // Send response
        res.json({

            success: true,

            ticket_id: ticket.ticket_id,

            similar_tickets_found: similarCount,

            analysis_saved: true,

            historical_tickets: similarTickets.map(item => ({

                ticket_id: item.ticket_id,

                issue: item.issue,

                root_cause: item.root_cause,

                repair_method: item.repair_method

            })),

            analysis

        });



    } catch (err) {

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

});