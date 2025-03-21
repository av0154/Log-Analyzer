const express = require("express");
const UnauthorizedAccess = require("../models/UnauthorizedAccess");
const SQLLog = require("../models/LogSQL"); //  Correct Import

const router = express.Router();

//  Fetch unauthorized access logs
router.get("/unauthorized-access", async (req, res) => {
    try {
        const logs = await UnauthorizedAccess.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Fetch SQL Injection logs
router.get("/sql-injection", async (req, res) => {
    try {
        const logs = await SQLLog.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Add SQL Injection log
router.post("/sql-injection", async (req, res) => {
    try {
        const { source_ip, destination_ip, sql_query, user_agent, http_status_code_response } = req.body;

        if (!source_ip || !destination_ip || !sql_query) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newLog = new SQLLog({
            timestamp: new Date(),
            source_ip,
            destination_ip,
            sql_query,
            user_agent,
            http_status_code_response,
            flagged: true
        });

        await newLog.save();
        res.status(201).json({ message: "SQL Injection Log added successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
