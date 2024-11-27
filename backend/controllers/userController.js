const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil" });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Campos editables
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;

            // Solo actualizar contraseña si se proporciona
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar perfil" });
    }
};

exports.findAvailableWalkers = async (req, res) => {
    const { date } = req.query;

    try {
        const walkers = await User.find({
            role: "walker",
            // Pendiente lógica para verificar disponibilidad
        }).select("name rating");

        res.json(walkers);
    } catch (error) {
        res.status(500).json({ message: "Error buscando paseadores" });
    }
};
