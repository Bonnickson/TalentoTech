const Walk = require("../models/walkModel");

exports.createWalk = async (req, res) => {
    try {
        const { pet, walker, date } = req.body;

        // Validaciones
        if (!pet || !walker || !date) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const walk = await Walk.create({
            pet,
            walker,
            owner: req.user._id,
            date,
            status: "pending",
        });

        res.status(201).json(walk);
    } catch (error) {
        console.error("Error al crear paseo:", error);
        res.status(500).json({
            message: "Error al crear paseo",
            error: error.message,
        });
    }
};

exports.getWalks = async (req, res) => {
    try {
        const walks =
            req.user.role === "owner"
                ? await Walk.find({ owner: req.user._id })
                      .populate("pet")
                      .populate("walker")
                : await Walk.find({ walker: req.user._id })
                      .populate("pet")
                      .populate("owner");

        res.json(walks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener paseos" });
    }
};

exports.updateWalkStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const walk = await Walk.findOneAndUpdate(
            { _id: req.params.id },
            { status },
            { new: true }
        );

        if (!walk) {
            return res.status(404).json({ message: "Paseo no encontrado" });
        }

        res.json(walk);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar paseo" });
    }
};
