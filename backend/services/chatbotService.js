import pool from "../config/database.js";
import { generateSQL } from "./sqlGenerator.js";
import { generateResponse } from "./responseGenerator.js";
import { validateSQL } from "../utils/validateSQL.js";

export const chatWithDatabase = async (question) => {

    // Step 1: Generate SQL
    const sql = await generateSQL(question);

    console.log("\nGenerated SQL:");
    console.log(sql);

    // Step 2: Validate SQL
    validateSQL(sql);

    // Step 3: Execute SQL
    const result = await pool.query(sql);

    // Step 4: Convert result into natural language
    const answer = await generateResponse(
        question,
        result.rows
    );

    return {
        question,
        sql,
        data: result.rows,
        answer
    };

};