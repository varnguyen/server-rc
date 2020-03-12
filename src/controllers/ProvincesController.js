/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Province = require("../models/ProvinceModel");

// let provinceLists = (req, result) => {
//     Province.getAllProvince((err, response) => {
//         if (err) throw err
//         return result.status(200).json({
//             "code": 0,
//             "message": "",
//             "error": "",
//             "data": response
//         })
//     })
// }

// Retrieve all users from the database.
let findAll = (req, result) => {
    Province.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || "Internal Server Error." });
        }
        else result.send(res);
    })
}

module.exports = {
    findAll: findAll
}