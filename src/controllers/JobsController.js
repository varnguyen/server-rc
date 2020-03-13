/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Job = require("../models/JobModel");

// Retrieve all users from the database.
let findAll = (req, result) => {
    Job.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || "Internal Server Error." });
        } else result.send({
            "code": 0,
            "message": "",
            "error": "",
            "data": res
        });
    })
}

module.exports = {
    findAll: findAll
}