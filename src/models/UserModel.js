'use strict';

const db = require('../database/db')

const User = function (user) {
    this.gender = user.gender;
    this.fake_name = user.fake_name;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.phone = user.phone;
    this.passwd = user.passwd;
    this.description = user.description;
    this.birthday = user.birthday;
    this.active = user.active;
    this.deleted = user.deleted;
    this.date_add = new Date();
    this.date_upd = new Date();
}

User.getAllUser = function (result) {
    let sql = 'SELECT * FROM rc_users'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
        } else {
            result(null, response);
        }
    })
}
User.getUserById = function (userId, result) {
    let sql = 'SELECT * FROM rc_users WHERE user_id = ?'
    db.query(sql, [userId], (err, response) => {
        if (err) {
            result(err, null);
        } else {
            result(null, response);
        }
    })
}
User.findEmail = function (email, result) {
    let sql = 'SELECT * FROM rc_users WHERE email = ?'
    db.query(sql, [email], (err, response) => {
        if (err) {
            result(err, null);
        } else {
            result(null, response);
        }
    })
}
User.updateUserById = function (userId, user, result) {
    let sql = 'UPDATE rc_users SET ? WHERE user_id = ?'
    db.query(sql, [user, userId], (err, response) => {
        if (err) {
            result(err, null);
        } else {
            result(null, response);
        }
    })
}
User.createUser = function (user, result) {
    let sql = 'INSERT INTO rc_users SET ?'
    db.query(sql, [user], (err, response) => {
        if (err) {
            result(err, null);
        } else {
            result(null, response.user_id);
        }
    })
}
User.removeUser = function (userId, result) {
    let sql = 'DELETE FROM rc_users WHERE user_id = ?';
    db.query(sql, [userId], (err, response) => {
        if (err) {
            result(null, err);
        } else {
            result(null, response);
        }
    })
}
module.exports = User;