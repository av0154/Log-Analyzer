// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { loadCSVData } = require("./utils/loadCSV");
const connectDB = require("./config/db");

const Log = require("./models/LogModel");
const SQLLog = require("./models/LogSQL");
const UnauthorizedAccess = require("./models/UnauthorizedAccess");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//  Connect to MongoDB BEFORE loading CSV data
connectDB()
    .then(async () => {
        console.log(" MongoDB Connected Successfully");

        //  Load CSV data only after DB is connected
        try {
            await loadCSVData();
            console.log(" CSV Data Loaded Successfully");
        } catch (err) {
            console.error(" CSV Load Error:", err);
        }

        //  Start the Express server after DB connection & CSV data is loaded
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

        //  Graceful shutdown for MongoDB
        process.on("SIGINT", async () => {
            console.log(" Closing MongoDB Connection...");
            await mongoose.connection.close();
            console.log(" Server Stopped");
            server.close(() => process.exit(0));
        });

    })
    .catch((error) => {
        console.error(" MongoDB Connection Failed:", error);
        process.exit(1); // Stop the server if DB connection fails
    });

//  API Health Check Route
app.get("/api/health", (req, res) => {
    res.json({ status: " Server is healthy", timestamp: new Date() });
});

//  API Route to Fetch General Logs (with Pagination)
app.get("/api/logs", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const logs = await Log.find()
            .sort({ timestamp: -1 }) // Sort by latest logs
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));
        
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching logs" });
    }
});

//  API Route to Fetch SQL Injection Logs (with Pagination)
app.get("/api/sql-logs", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const sqlLogs = await SQLLog.find()
            .sort({ timestamp: -1 })
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

        const formattedSQLLogs = sqlLogs.map(log => ({
            _id: log._id,
            timestamp: log.timestamp,
            source_ip: log.source_ip || "Unknown IP",
            destination_ip: log.destination_ip || "Unknown IP",
            sql_query: log.sql_query,
            user_agent: log.user_agent,
            http_status_code_response: log.http_status_code_response,
            flagged: log.flagged
        }));

        res.json(formattedSQLLogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching SQL logs" });
    }
});

//  API Route to Fetch Unauthorized Access Logs (with Pagination)
app.get("/api/unauthorized-access", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const unauthorizedLogs = await UnauthorizedAccess.find()
            .sort({ timestamp: -1 })
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

        const formattedUnauthorizedLogs = unauthorizedLogs.map(log => ({
            _id: log._id,
            timestamp: log.timestamp,
            source_ip: log.source_ip || "Unknown IP",
            destination_ip: log.destination_ip || "Unknown IP",
            access_type: log.access_type,
            user_agent: log.user_agent,
            http_status_code_response: log.http_status_code_response,
            flagged: log.flagged
        }));

        res.json(formattedUnauthorizedLogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching unauthorized access logs" });
    }
});
