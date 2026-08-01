import express from "express";
import dotenv from "dotenv";

import ticketRoutes from "./routes/ticketRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("OpMemory Backend Running");
});

app.use("/tickets", ticketRoutes);
app.use("/", aiRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});