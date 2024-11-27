const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        breed: { type: String },
        age: { type: Number },
        weight: { type: Number },
        specialNeeds: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
