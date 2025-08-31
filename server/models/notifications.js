const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "Main", required: true },
    message: { type: String, required: true },
    read: {type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("Notification", NotificationsSchema);