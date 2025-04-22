// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Assuming it's a .js file too
import verifyToken from './middleware/verifyToken.js'; // Assuming it's a .js file

// import authRoutes from "./routes/authRoutes.js";
// import verifyToken from "./middleware/verifyToken.js";




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
app.use('/api/auth', authRoutes);

app.use('/api/subscriptions', verifyToken, subscriptionRoutes);



// Connect to MongoDB   
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((err) => console.error("MongoDB connection failed:", err));
