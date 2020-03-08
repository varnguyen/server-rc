'use strict';

const db = require('../database/db')

const Province = function () {
}

Province.getAllProvince = function (result) {
    let sql = 'SELECT * FROM rc_provinces'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
        } else {
            result(null, response);
        }
    })
}

module.exports = Province;