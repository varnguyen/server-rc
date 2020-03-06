'use strict'

const User = require("../models/UserModel");
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-min-ja-hammer@bit";

let getUserInfo = async (req, result) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    const userId = decoded.data.user_id;
    User.getUserById(userId, (err, response) => {
        if (err) throw err
        if (response.length > 0) {
            return result.status(200).json(response[0])
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
        return result.status(200).json({ message: 'User Not Found!' })
    })
}
let updateUserInfo = (req, result) => {
    let data = req.body;
    let userId = req.params.userId;
    User.updateUserById(userId, new User(data), (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Update success!' })
    })
}
let createUser = (req, result) => {
    let data = req.body;
    User.createUser(new User(data), (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Insert success!' })
    })
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