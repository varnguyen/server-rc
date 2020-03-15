/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Province = require("../models/ProvinceModel");
const { INTERNAL_SERVER_ERROR } = require("../helpers/error-msg");

// Retrieve all users from the database.
let findAll = (req, result) => {
    Province.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        } else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

module.exports = {
    findAll: findAll
}