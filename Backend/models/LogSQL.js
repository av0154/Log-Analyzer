const mongoose = require("mongoose");

const SQLLogSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    source_ip: { type: String, required: true },
    destination_ip: { type: String, required: true },
    sql_query: { type: String, required: true },
    user_agent: { type: String, required: true },
    http_status_code_response: { type: Number, required: true },
    flagged: { type: Boolean, default: true }
});

// Prevent OverwriteModelError
const SQLLog = mongoose.models.SQLLog || mongoose.model("SQLLog", SQLLogSchema);
module.exports = SQLLog;
