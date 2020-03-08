'use strict'

const Job = require("../models/JobModel");

let JobLists = (req, result) => {
    Job.getAllJob((err, response) => {
        if (err) throw err
        return result.status(200).json({
            "code": 0,
            "message": "",
            "error": "",
            "data": response
        })
    })
}

module.exports = {
    JobLists: JobLists
}