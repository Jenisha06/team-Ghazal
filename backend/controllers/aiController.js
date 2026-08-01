import { supabase } from "../config/supabase.js";
import analyzeTicket from "../services/aiService.js";
import redis from "../config/redis.js";

export const analyzeCurrentTicket = async (ticket_id) => {

    // Fetch current ticket
    const { data: ticket, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("ticket_id", ticket_id)
        .single();

    if (error || !ticket) {
        throw new Error("Ticket not found");
    }

    // Extract keywords from issue
    const searchKeyword = ticket.issue
        .split(" ")
        .slice(0, 3)
        .join(" ");

    // Find similar historical tickets
    const { data: historicalTickets, error: historyError } =
        await supabase
            .from("tickets")
            .select("*")
            .ilike("issue", `%${searchKeyword}%`)
            .limit(10);

    if (historyError) {
        throw new Error(historyError.message);
    }

    // Remove current ticket
    const similarTickets = historicalTickets.filter(
        item => item.ticket_id !== ticket.ticket_id
    );

    const similarCount = similarTickets.length;

    const cacheKey = `analysis:${ticket.issue.toLowerCase()}`;

const cached = await redis.get(cacheKey);

if (cached) {

    console.log("CACHE HIT");

    return JSON.parse(cached);

}

    // Run AI
    const aiResponse = await analyzeTicket(
        ticket,
        similarTickets
    );

    const analysis = JSON.parse(aiResponse);

    const response = {

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

};

await redis.set(

    cacheKey,

    JSON.stringify(response),

    {

        EX: 86400

    }

);

    // Save analysis
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
        throw new Error(saveError.message);
    }

    return response;

};