const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = {
    errorHandler,
    notFound,
};
