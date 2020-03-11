'use strict'

const User = require("../models/UserModel");
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit";
const { validationResult } = require('express-validator/check');

let getUserInfo = async (req, result) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    const userId = decoded.data.user_id;
    User.getUserById(userId, (err, response) => {
        if (err) throw err
        if (response.length > 0) {
            return result.status(200).json({
                "code": 0,
                "message": "",
                "error": "",
                "data": response[0]
            })
        }
        return result.status(200).json({ message: 'User Not Found!' })
    })
}
let userLists = (req, result) => {
    User.getAllUser((err, response) => {
        if (err) throw err
        return result.status(200).json(response)
    })
}
let userDetail = (req, result) => {
    let userId = req.params.userId;
    User.getUserById(userId, (err, response) => {
        if (err) throw err
        if (response.length > 0) {
            return result.status(200).json(response[0])
        }
        return result.status(404).json({ message: 'User Not Found!' })
    })
}
let updateUserInfo = (req, result) => {
    let data = req.body;
    let userId = data.user_id;
    User.updateUserById(userId, new User(data), (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Update success!' })
    })
}
let createUser = (req, result) => {
    let data = req.body;
    const { nick_name, email, password, gender } = req.body
    const errors = validationResult(req);
    const errorss = {};
    if (!errors.isEmpty()) {
        return result.status(422).json({ errors: errors.array() });
    } else {
        // // Validate Email
        // User.findEmail(email, (err, response) => {
        //     if (err) {
        //         result.json({
        //             "code": 500,
        //             "failed": "Error on the server."
        //         })
        //     } else {
        //         if (response.length > 0) {
        //             // Đã trùng email
        //             errorss["email"] = "Email đã được sử dụng."
        //             result.status(400).send({ errorss })
        //         }
        //     }
        // })
        // // Validate Email
        // User.findNickname(nick_name, (err, response) => {
        //     if (err) {
        //         result.json({
        //             "code": 500,
        //             "failed": "Error on the server."
        //         })
        //     } else {
        //         if (response.length > 0) {
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

        User.createUser(new User(data), (err, response) => {
            if (err) throw err
            return result.status(200).json({ message: 'Insert success!' })
        })
    }
}
let deleteUser = (req, result) => {
    let userId = req.params.userId;
    User.removeUser(userId, (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Delete success!' })
    })
}

module.exports = {
    getUserInfo: getUserInfo,
    userLists: userLists,
    userDetail: userDetail,
    updateUserInfo: updateUserInfo,
    createUser: createUser,
    deleteUser: deleteUser
}