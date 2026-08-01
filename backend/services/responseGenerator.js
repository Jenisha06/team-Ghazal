import axios from "axios";

export const generateResponse = async (question, sqlResult) => {

    const prompt = `
You are an AI Operations Assistant for an ATM maintenance company.

The admin asked:

"${question}"

The database returned:

${JSON.stringify(sqlResult, null, 2)}

Answer naturally.

Rules:

- Do not mention SQL.
- Explain in simple English.
- If the result is empty, politely say no records were found.
- Keep the answer under 120 words.
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