/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict';

const db = require('../database/db')

const Province = function () {
}

Province.getAll = function (result) {
    let sql = 'SELECT * FROM rc_provinces'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, response);
    })
}

module.exports = Province;