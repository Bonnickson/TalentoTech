const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["owner", "walker"], required: true },
        phone: { type: String },
        address: { type: String },
        rating: { type: Number, default: 0 },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
