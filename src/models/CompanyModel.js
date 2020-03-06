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

Company.getAllCompany = function (result) {
    let sql = 'SELECT * FROM rc_companys'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, response);
        }
    })
}
Company.getCompanyById = function (companyId, result) {
    let sql = 'SELECT * FROM rc_companys WHERE company_id = ?'
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, response);
        }
    })
}
Company.updateCompanyById = function (companyId, company, result) {
    let sql = 'UPDATE rc_companys SET ? WHERE company_id = ?'
    db.query(sql, [company, companyId], (err, response) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, response);
        }
    })
}
Company.createCompany = function (company, result) {
    let sql = 'INSERT INTO rc_companys SET ?'
    db.query(sql, [company], (err, response) => {
        if (err) {
            result(err, null);
        }
        else {
            console.log(response);
            result(null, response.company_id);
        }
    })
}
Company.removeCompany = function (companyId, result) {
    let sql = 'DELETE FROM rc_companys WHERE company_id = ?';
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, response);
        }
    })
}
module.exports = Company;