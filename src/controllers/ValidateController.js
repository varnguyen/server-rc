/**
 * @Created by MinJa 
 * on 09/03/2020.
 */

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
                    .isLength({ min: 6, max: 12 }).withMessage('Password must be 5 - 30 charactors')
            ]
        }
        case 'registerUser': {
            return [
                body('nick_name').not().isEmpty().withMessage('Nickname is required')
                    .isLength({ min: 5, max: 30 }).withMessage('Nickname must be 5 - 30 charactors')
                ,
                body('gender').exists().isInt()
                ,
                body('email').not().isEmpty().withMessage('Email is required')
                    .isEmail().withMessage('Email must be email')
                ,
                body('password')
                    .not().isEmpty().withMessage('Password is required')
                    .isLength({ min: 6, max: 12 }).withMessage('Password must be 5 - 30 charactors')
                    .custom((value, { req }) => {
                        if (value !== req.body.rep_password) {
                            throw new Error('Password confirmation is incorrect');
                        }
                    })
                ,
            ]
        }
    }
}

module.exports = { validate, validate }