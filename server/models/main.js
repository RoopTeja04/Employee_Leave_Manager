const mongoose = require('mongoose');

const mainSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now, required: true },
    levaes: { type: Number, default: 30 },
    role: { type: String, enum: ["employee", "admin"], default: "employee" },
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Main', mainSchema); 