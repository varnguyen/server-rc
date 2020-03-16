/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict';

const db = require("../database/db");

const Company = function (company) {
    // this.gender = company.gender;
    // this.fake_name = company.fake_name;
    // this.first_name = company.first_name;
    // this.last_name = company.last_name;
    // this.email = company.email;
    // this.phone = company.phone;
    // this.passwd = company.passwd;
    // this.description = company.description;
    // this.birthday = company.birthday;
    // this.active = company.active;
    // this.deleted = company.deleted;
    // this.date_add = new Date();
    // this.date_upd = new Date();
}

Company.create = function (company, result) {
    let sql = 'INSERT INTO rc_companys SET ?'
    db.query(sql, [company], (err, response) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, { company_id: response.insertId, ...company });
        }
    })
}
Company.getAll = function (queryData, result) {
    console.log("query: ", queryData);
    const { page, row, job_id, province_id, company_name } = queryData
    // queryData.page = parseInt(queryData.page)
    // queryData.row = parseInt(queryData.row)
    // queryData.job_id = parseInt(queryData.job_id)
    // queryData.province_id = parseInt(queryData.province_id)
    const limit = (page - 1) * row + ',' + row;
    const pageNumber = (page - 1) * row;
    const pageSize = row

    let sql = "SELECT * FROM rc_companys";
    // if (job_id) {
    //     sql += ` WHERE job_id = ${job_id}`;
    // }
    // if (province_id) {
    //     sql += ` AND province_id = ${province_id}`;
    // }
    // if (company_name) {
    //     sql += ` AND company_name = ${province_id}`;
    // }
    if (page && row) {
        sql += ` LIMIT ${limit}`;
    }


    console.log(sql)

    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, response);
    })
}
Company.findById = function (companyId, result) {
    let sql = 'SELECT * FROM rc_companys WHERE company_id = ?'
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            result(err, null);
            return;
        }
        if (response.length) {
            result(null, response[0]);
            return;
        }
        // not found company with the id
        result({ kind: "not_found" }, null);
    })
}
Company.updateById = function (companyId, company, result) {
    let sql = 'UPDATE rc_companys SET ? WHERE company_id = ?'
    db.query(sql, [company, companyId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found company with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { company_id: companyId, ...company });
    })
}
Company.remove = function (companyId, result) {
    let sql = 'DELETE FROM rc_companys WHERE company_id = ?';
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found company with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, response);
    })
}
module.exports = Company;