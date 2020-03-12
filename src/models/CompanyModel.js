/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict';

const db = require('../database/db')

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
        console.log("object", err, response);
        if (err) {
            console.log("create error: ", err);
            result(err, null);
            return;
        } else {
            result(null, { company_id: response.insertId, ...company });
        }
    })
}
Company.getAll = function (result) {
    let sql = 'SELECT * FROM rc_companys'
    db.query(sql, (err, response) => {
        if (err) {
            console.log("getAll error: ", err);
            result(null, err);
            return;
        }
        console.log("companys: ", response);
        result(null, response);
    })
}
Company.findById = function (companyId, result) {
    let sql = 'SELECT * FROM rc_companys WHERE company_id = ?'
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            console.log("findById error: ", err);
            result(err, null);
            return;
        }
        if (response.length) {
            console.log("found company: ", response[0]);
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
            console.log("updateById error: ", err);
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found company with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated company: ", { company_id: companyId, ...company });
        result(null, { company_id: companyId, ...company });
    })
}
Company.remove = function (companyId, result) {
    let sql = 'DELETE FROM rc_companys WHERE company_id = ?';
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            console.log("remove error: ", err);
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found company with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted company with id: ", companyId);
        result(null, response);
    })
}
module.exports = Company;