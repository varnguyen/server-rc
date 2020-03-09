
const { body } = require('express-validator/check')

let validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email').not().isEmpty().withMessage('Email is required')
                    .isEmail().withMessage('Email must be email')
                ,
                body('password')
                    .not().isEmpty().withMessage('Password is required')
                    .isLength({ min: 6 }).withMessage('Password phải lớn hơn 6 ký tự')
            ]
        }
        case 'createUser': {
            return [
                body('nick_name').not().isEmpty().withMessage('Nickname is required')
                    .isLength({ min: 5 }).withMessage('Nickname phải lớn hơn 5 ký tự')
                ,
                body('gender').exists().isInt()
                ,
                body('email').not().isEmpty().withMessage('Email is required')
                    .isEmail().withMessage('Email must be email')
                ,
                body('password')
                    .not().isEmpty().withMessage('Password is required')
                    .isLength({ min: 6 }).withMessage('Password phải lớn hơn 6 ký tự')
            ]
        }
    }
}

module.exports = { validate, validate }