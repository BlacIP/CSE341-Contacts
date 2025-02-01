const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const contactValidationRules = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('favoriteColor')
        .trim()
        .notEmpty()
        .withMessage('Favorite color is required'),
    body('birthday')
        .trim()
        .notEmpty()
        .withMessage('Birthday is required')
        .isISO8601()
        .withMessage('Invalid date format')
];

const validateId = [
    param('id')
        .notEmpty()
        .withMessage('ID is required')
        .isMongoId()
        .withMessage('Invalid ID format')
];

module.exports = {
    validate,
    contactValidationRules,
    validateId
};
