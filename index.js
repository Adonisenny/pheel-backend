import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authrouter from './routes/userRoutes.js'
import contentrouter from './routes/ContentRoutes.js'
import threadrouter from './routes/threadRoutes.js'
import bodyParser from "body-parser";

const app = express();
dotenv.config();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend-url.com"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/auth', authrouter);
app.use('/api/content', contentrouter);
app.use('/api/thread', threadrouter);

// Health Check
app.get("/api/health", (req, res) => {
    res.json({ message: "Server is running fine" });
});

// Error Handling (MOVED TO BOTTOM)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
