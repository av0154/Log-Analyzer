const mongoose = require("mongoose");

const UnauthorizedAccessSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    source_ip: { type: String, required: true },
    destination_ip: { type: String, required: true },
    access_type: { type: String, required: true },  // ✅ Ensure required field
    user_agent: { type: String },
    http_status_code_response: { type: Number },
    flagged: { type: Boolean, default: false }
});

module.exports = mongoose.model("UnauthorizedAccess", UnauthorizedAccessSchema);
