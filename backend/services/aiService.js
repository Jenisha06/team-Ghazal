const axios = require("axios");


async function analyzeTicket(ticket, historicalTickets) {


    const prompt = `
You are OpMemory AI, an expert maintenance and reliability engineer specializing in ATM and operational asset maintenance.

Your task is to analyze a current maintenance ticket using historical operational incidents.

Use previous incidents as knowledge to identify patterns, recurring failures, and the most effective repair approach.

Do not invent facts. If information is missing, return "Unknown".


==================================================
CURRENT TICKET
==================================================

Ticket ID:
${ticket.ticket_id}

ATM ID:
${ticket.atm_id}

Location:
${ticket.location}

Asset Model:
${ticket.asset_model}

Issue:
${ticket.issue}

Assigned Engineer:
${ticket.engineer}

Technician Notes:
${ticket.technician_notes || "Not Provided"}



==================================================
HISTORICAL INCIDENTS
==================================================

Previous similar incidents:

${historicalTickets.length > 0

            ?
            historicalTickets.map((item, index) => `

Incident ${index + 1}

Ticket ID:
${item.ticket_id}

Issue:
${item.issue}

Root Cause:
${item.root_cause || "Unknown"}

Repair Method:
${item.repair_method || "Unknown"}

Repair Type:
${item.repair_type || "Unknown"}

Preventive Action:
${item.preventive_action || "Unknown"}

-----------------------------

`).join("")

            :

            "No similar incidents found."

        }


Total Historical Similar Incidents:

${historicalTickets.length}



==================================================
ANALYSIS REQUIRED
==================================================

Analyze the current ticket using the historical information.

Generate:

1. Root Cause
Most likely reason for failure.

2. Repair Method
Recommended repair approach.

3. Repair Type

Choose ONLY ONE:

- Hardware
- Software
- Network
- Power
- Configuration
- Preventive Maintenance
- Unknown


4. Confidence Score

Value between 0.00 and 1.00.


5. Preventive Action

How to prevent this issue in future.


6. Historical Pattern

Explain briefly whether this issue occurred before and what pattern was observed.


7. Recommended Fix

Give the best action for the engineer based on previous successful repairs.



==================================================
RULES
==================================================

- Return ONLY valid JSON.
- Do not use markdown.
- Do not include explanations outside JSON.
- Do not hallucinate.
- Use "Unknown" when information is unavailable.



Expected JSON:

{
 "root_cause":"",
 "repair_method":"",
 "repair_type":"",
 "confidence_score":0.00,
 "preventive_action":"",
 "historical_pattern":"",
 "recommended_fix":"",
 "similar_tickets_found":0
}

`;



    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model: "llama3.1:8b",
            prompt: prompt,
            stream: false
        }
    );


    return response.data.response;

}


module.exports = analyzeTicket;