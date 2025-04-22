// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import subscriptionRoutes from './routes/subscriptionRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("RepReminder Backend Running 💪");
});
// Routes 
app.use('/api/subscriptions', subscriptionRoutes);



// Connect to MongoDB   
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((err) => console.error("MongoDB connection failed:", err));
