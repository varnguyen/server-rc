/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict';

const db = require('../database/db')

const Job = function (job) {
    this.job_id = job.job_id;
    this.job_name = job.job_name;
    this.date_add = job.date_add;
    this.date_upd = new Date();
}

Job.create = function (job, result) {
    let sql = 'INSERT INTO rc_jobs SET ?'
    db.query(sql, [company], (err, response) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, { job_id: response.insertId, ...job });
        }
    })
}
Job.getAll = function (result) {
    let sql = 'SELECT * FROM rc_jobs'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, response);
    })
}
Job.findById = function (jobId, result) {
    let sql = 'SELECT * FROM rc_jobs WHERE job_id = ?'
    db.query(sql, [jobId], (err, response) => {
        if (err) {
            result(err, null);
            return;
        }
        if (response.length) {
            result(null, response[0]);
            return;
        }
        // not found job with the id
        result({ kind: "not_found" }, null);
    })
}
Job.updateById = function (jobId, job, result) {
    let sql = 'UPDATE rc_jobs SET ? WHERE job_id = ?'
    db.query(sql, [job, jobId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found job with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { job_id: jobId, ...job });
    })
}
Job.remove = function (jobId, result) {
    let sql = 'DELETE FROM rc_jobs WHERE job_id = ?';
    db.query(sql, [jobId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found job with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, response);
    })
}
module.exports = Job;