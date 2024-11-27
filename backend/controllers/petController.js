const Pet = require("../models/petModel");

exports.createPet = async (req, res) => {
    const { name, breed, age, weight, specialNeeds } = req.body;

    try {
        const pet = await Pet.create({
            name,
            owner: req.user._id,
            breed,
            age,
            weight,
            specialNeeds,
        });

        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: "Error al crear mascota" });
    }
};

exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user._id });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mascotas" });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }

        res.json(pet);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar mascota" });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!pet) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }

        res.json({
            message: "Mascota eliminada correctamente",
            petId: req.params.id,
        });
    } catch (error) {
        console.error("Error al eliminar mascota:", error);
        res.status(500).json({ message: "Error al eliminar mascota" });
    }
};
