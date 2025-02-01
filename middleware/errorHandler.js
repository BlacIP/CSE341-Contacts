const { AppError } = require('../helpers/errorClasses');

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }

    if (process.env.NODE_ENV === 'production') {
        return sendErrorProd(err, res);
    }
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};

const handleMongoErrors = (err) => {
    if (err.name === 'CastError') {
        err = new AppError('Invalid ID format', 400);
    }
    if (err.code === 11000) {
        err = new AppError('Duplicate field value', 400);
    }
    if (err.name === 'ValidationError') {
        err = new AppError('Validation error', 400);
    }
    return err;
};

module.exports = {
    errorHandler,
    handleMongoErrors
};