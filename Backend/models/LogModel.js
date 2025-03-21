const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    source_ip: { type: String, required: true },
    destination_ip: { type: String, required: true },
    user_agent: { type: String, required: true },
    http_status_code_response: { type: Number, required: true },
    flagged: { type: Boolean, default: false }
});

// Prevent OverwriteModelError
const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);
module.exports = Log;
