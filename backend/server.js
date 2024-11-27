const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const walkRoutes = require("./routes/walkRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error de conexión:", err));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/walks", walkRoutes);

// Middleware de error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
