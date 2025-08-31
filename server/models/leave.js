const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({

    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Main", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    reason: { type: String }

})

module.exports = mongoose.model("Leave", LeaveSchema);