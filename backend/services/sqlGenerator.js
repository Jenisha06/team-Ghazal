import axios from "axios";

export const generateSQL = async (question) => {

    const prompt = `
You are an expert PostgreSQL assistant.

The database contains only these tables.

TABLE: tickets

Columns:
ticket_id
atm_id
location
asset_model
issue
engineer
technician_notes
resolution_time
status
created_date
root_cause
repair_method
repair_type
preventive_action
engineer_id

TABLE: ai_analysis

Columns:
ticket_id
root_cause
repair_method
repair_type
confidence_score
preventive_action
created_at
historical_pattern
recommended_fix
similar_tickets_found

Rules:

1. Generate ONLY PostgreSQL SELECT queries.
2. Never generate INSERT.
3. Never generate UPDATE.
4. Never generate DELETE.
5. Never generate DROP.
6. Never generate ALTER.
7. Never explain anything.
8. Return ONLY SQL.
9. Do not wrap SQL inside markdown.

Question:

${question}
`;

    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model: "llama3.1:8b",
            prompt,
            stream: false
        }
    );

    return response.data.response.trim();

};