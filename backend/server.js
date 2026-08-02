import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import ticketRoutes from "./routes/ticketRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import technicianRoutes from "./routes/technicianRoutes.js";

dotenv.config();

const app = express();


app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("OpMemory Backend Running");
});

app.use("/technician", technicianRoutes);
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);
app.use("/", aiRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});