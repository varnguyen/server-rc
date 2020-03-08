'use strict';

const db = require('../database/db')

const Job = function () {
}

Job.getAllJob = function (result) {
    let sql = 'SELECT * FROM rc_jobs'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
        } else {
            result(null, response);
        }
    })
}

module.exports = Job;