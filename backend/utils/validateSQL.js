export const validateSQL = (sql) => {

    const query = sql.trim().toUpperCase();

    // Must start with SELECT
    if (!query.startsWith("SELECT")) {
        throw new Error("Only SELECT queries are allowed.");
    }

    // Block dangerous SQL
    const blockedKeywords = [
        "INSERT",
        "UPDATE",
        "DELETE",
        "DROP",
        "ALTER",
        "TRUNCATE",
        "CREATE",
        "GRANT",
        "REVOKE"
    ];

    for (const keyword of blockedKeywords) {

        if (query.includes(keyword)) {

            throw new Error(`Blocked SQL keyword detected: ${keyword}`);

        }

    }

    return true;

};