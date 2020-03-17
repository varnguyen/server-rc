/**
 * @Created by MinJa 
 * on 06/03/2020.
 */

'use strict'

const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require("../@config/key")
const User = require("../models/UserModel")
const jwtHelper = require("../helpers/jwt.helper")
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit";
const { validationResult } = require("express-validator/check");
const { INTERNAL_SERVER_ERROR, EMAIL_REGISTER, NICK_NAME_REGISTER, UPDATE_SUCCESS, DELETE_SUCCESS, CONTENT_CAN_NOT_EMPTY } = require("../helpers/error-msg")

// Create and save a new user
let create = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }
    const { nick_name, email, password, gender } = req.body;
    // Create a Customer
    const user = new User({ nick_name, email, password, gender });
    const hash = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    user.password = hash;

    User.findNickname(nick_name, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                User.findEmail(email, (err, res) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            // Save Customer in the database
                            User.create(user, (err, res) => {
                                if (err) {
                                    result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
                                }
                                else result.send({
                                    code: 0,
                                    message: "",
                                    data: res
                                });
                            });
                        } else {
                            result.status(500).send({ message: INTERNAL_SERVER_ERROR });
                        }
                    } else result.status(200).send({
                        code: 2,
                        message: EMAIL_REGISTER,
                        data: ""
                    });

                })
            } else {
                result.status(500).send({ message: INTERNAL_SERVER_ERROR });
            }
        }
        else result.status(200).send({
            code: 4,
            message: NICK_NAME_REGISTER,
            data: ""
        });
    })


    // // Save Customer in the database
    // User.create(user, (err, res) => {
    //     if (err) {
    //         result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
    //     }
    //     else result.send({
    //         code: 0,
    //         message: "",
    //         data: res
    //     });
    // });

    return;

    let data = req.body;
    const errors = validationResult(req);
    const errorss = {};

    if (!errors.isEmpty()) {
        console.log("FAILS VALID");
        result.status(422).json({ errors: errors.array() });
        return;
    } else {
        console.log("PASS VALID");


        // return;
        // User.findEmail(email, (err, res) => {
        //     if (err) {
        //         console.log(err);
        //         result.sendStatus(500);
        //         return;
        //         // result.json({
        //         //     "code": 500,
        //         //     "failed": "Error on the server."
        //         // })
        //         return;
        //     } else {
        //         if (res.length > 0) {
        //             // Đã trùng email
        //             errorss["email"] = "Email đã được sử dụng."
        //             const obj = {
        //                 "code": 2,
        //                 "message": 'Email đã được sử dụng.',
        //                 "error": errorss,
        //                 "data": ""
        //             };
        //             result.status(201).send(obj)
        //             return;
        //             // result.write(JSON.stringify(obj));
        //             // result.end();
        //         }
        //     }
        // })
        // // Validate Email
        // User.findNickname(nick_name, (err, res) => {
        //     if (err) {
        //         result.json({
        //             "code": 500,
        //             "failed": "Error on the server."
        //         })
        //     } else {
        //         if (res.length > 0) {
        //             // Đã trùng email
        //             errorss["nick_name"] = "Nickname đã được sử dụng."
        //             result.status(400).send({ errorss })
        //         }
        //     }
        // })


        // if (!String(nick_name).trim()) {
        //     errors.name = 'Invalid value';
        // }
        // if (nick_name.trim().length > 100) {
        //     errors.name = 'Maxlength is 100';
        // }

        // // Validate Password
        // if (!String(password).trim()) {
        //     errors.name = 'Invalid value';
        // }
        // if (password.trim().length < 8) {
        //     errors.password = 'Minlength is 8';
        // }
        // if (password.trim().length > 16) {
        //     errors.password = 'Maxlength is 16';
        // }



        // const isValidEmail = (email) => {
        //     var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return regex.test(String(email).toLowerCase());
        // }

        // User.createUser(new User(data), (err, res) => {
        //     if (err) {
        //         console.log(err);
        //         result.sendStatus(500);
        //         return;
        //     } else {
        //         const obj = {
        //             "code": 0,
        //             "message": "Register success!",
        //             "error": "",
        //             "data": res
        //         };
        //         result.status(201).send(obj);
        //         return;
        //         // result.write(JSON.stringify(obj));
        //         // result.end();
        //     }
        // })
    }

    // res.status(500).json({ message: 'Internal Server Error.' });

}

// Retrieve all users from the database.
let findAll = (req, result) => {
    User.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }
        else result.send(res);
    })
}

// Find a single user with a userId
let findOne = (req, result) => {
    let userId = req.params.userId;
    User.findById(userId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found user with id ${userId}.` });
            } else {
                result.status(500).send({ message: "Error retrieving user with id " + userId });
            }
        }
        else result.send(res);
    })
}

// Find a single user logging with a userId
let getUserInfo = async (req, result) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    const userId = decoded.data.user_id;
    User.findById(userId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(200).send({ message: "User Not Found!" });
            } else {
                result.status(500).send({ message: "Error retrieving user with id " + userId });
            }
        } else result.status(200).send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Update a user identified by the userId in the request
let update = async (req, result) => {
    // Validate Request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    let user = req.body;
    const userId = decoded.data.user_id;
    User.updateById(userId, new User(user), (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found user with id ${userId}.` });
            } else {
                result.status(500).send({ message: "Error updating user with id " + userId });
            }
        } else result.send({
            code: 0,
            message: UPDATE_SUCCESS,
            data: res
        });
    });
}

// // Update a user identified by the userId in the request
// let update = (req, result) => {
//     // Validate Request
//     if (!req.body) {
//         result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
//     }
//     let data = req.body;
//     let userId = data.user_id;
//     User.updateById(userId, new User(data), (err, res) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 result.status(404).send({ message: `Not found user with id ${userId}.` });
//             } else {
//                 result.status(500).send({ message: "Error updating user with id " + userId });
//             }
//         } else result.send(res);
//     });
// }

// Delete a user with the specified userId in the request
const remove = (req, result) => {
    let userId = req.params.userId;
    User.remove(userId, (err, res) => {
        console.log("err remove ", err)
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found user with id ${userId}.` });
            } else {
                result.status(500).send({ message: "Could not delete user with id " + userId });
            }
        }
        else result.send({ message: DELETE_SUCCESS });
    })
}

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    getUserInfo: getUserInfo,
    update: update,
    remove: remove,
}