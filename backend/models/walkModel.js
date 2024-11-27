const mongoose = require("mongoose");

const walkSchema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet",
            required: true,
        },
        walker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: { type: Date, required: true },
        endTime: { type: String },
        duration: { type: Number },
        status: {
            type: String,
            enum: ["pending", "accepted", "completed", "cancelled"],
            default: "pending",
        },
        price: { type: Number },
        notes: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Walk", walkSchema);
