'use strict'

const Province = require("../models/ProvinceModel");

let provinceLists = (req, result) => {
    Province.getAllProvince((err, response) => {
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
    provinceLists: provinceLists
}