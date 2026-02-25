const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    if (process.env.NODE_ENV !== 'production') {
        console.error(`[Error] ${statusCode} - ${message}`);
        if (err.stack) console.error(err.stack);
    }

    res.status(statusCode).json({ error: message });
};

export default errorHandler;
