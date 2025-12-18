const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

const validateRegister = [
    body('login')
        .trim()
        .notEmpty().withMessage('Login is required')
        .isLength({ min: 3, max: 20 }).withMessage('Login must be between 3 and 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Login can only contain letters, numbers and underscores'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    handleValidationErrors
];

const validateLogin = [
    body('login')
        .trim()
        .notEmpty().withMessage('Login is required'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const validatePost = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required')
        .isURL().withMessage('Image must be a valid URL'),
    handleValidationErrors
];

const validateComment = [
    body('content')
        .trim()
        .notEmpty().withMessage('Comment content is required')
        .isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters'),
    handleValidationErrors
];

const validateFeedback = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[\d\s\(\)\+\-]+$/).withMessage('Invalid phone number format'),
    body('city')
        .trim()
        .notEmpty().withMessage('City is required')
        .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),
    body('discipline')
        .notEmpty().withMessage('Discipline is required')
        .isIn(['weightlifting', 'powerlifting']).withMessage('Discipline must be weightlifting or powerlifting'),
    body('height')
        .notEmpty().withMessage('Height is required')
        .isInt({ min: 100, max: 250 }).withMessage('Height must be between 100 and 250 cm'),
    body('weight')
        .notEmpty().withMessage('Weight is required')
        .isFloat({ min: 30, max: 300 }).withMessage('Weight must be between 30 and 300 kg'),
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female']).withMessage('Gender must be male or female'),
    handleValidationErrors
];

module.exports = {
    validateRegister,
    validateLogin,
    validatePost,
    validateComment,
    validateFeedback,
};

