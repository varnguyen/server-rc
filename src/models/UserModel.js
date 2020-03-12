/**
 * @Created by MinJa 
 * on 06/03/2020.
 */

'use strict';

const db = require('../database/db')

const User = function (user) {
    this.gender = user.gender;
    this.nick_name = user.nick_name;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.description = user.description;
    this.birthday = user.birthday;
    this.active = user.active ? user.active : 1;
    this.deleted = user.deleted;
    this.date_add = user.date_add ? user.date_add : new Date();
    this.date_upd = new Date();
}

User.create = function (user, result) {
    let sql = 'INSERT INTO rc_users SET ?'
    db.query(sql, [user], (err, response) => {
        console.log("object", err, response);
        if (err) {
            console.log("createUser error: ", err);
            result(err, null);
            return;
        } else {
            result(null, { user_id: response.insertId, ...user });
        }
    })
}
User.getAll = function (result) {
    let sql = 'SELECT * FROM rc_users'
    db.query(sql, (err, response) => {
        if (err) {
            console.log("getAll error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", response);
        result(null, response);
    })
}
User.findById = function (userId, result) {
    let sql = 'SELECT * FROM rc_users WHERE user_id = ?'
    db.query(sql, [userId], (err, response) => {
        if (err) {
            console.log("findById error: ", err);
            result(err, null);
            return;
        }
        if (response.length) {
            console.log("found user: ", response[0]);
            result(null, response[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    })
}
User.findEmail = function (email, result) {
    let sql = 'SELECT * FROM rc_users WHERE email = ?'
    db.query(sql, [email], (err, response) => {
        if (err) {
            console.log("findEmail error: ", err);
            result(err, null);
            return;
        }
        if (response.length) {
            console.log("found email: ", response[0]);
            result(null, response[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    })
}
User.findNickname = function (nickName, result) {
    let sql = 'SELECT * FROM rc_users WHERE nick_name = ?'
    db.query(sql, [nickName], (err, response) => {
        if (err) {
            result(err, null);
        } else {
            result(null, response);
        }
    })
}
User.updateById = function (userId, user, result) {
    let sql = 'UPDATE rc_users SET ? WHERE user_id = ?'
    db.query(sql, [user, userId], (err, response) => {
        if (err) {
            console.log("updateById error: ", err);
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated user: ", { user_id: userId, ...user });
        result(null, { user_id: userId, ...user });
    })
}
User.remove = function (userId, result) {
    let sql = 'DELETE FROM rc_users WHERE user_id = ?';
    db.query(sql, [userId], (err, response) => {
        if (err) {
            console.log("remove error: ", err);
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", userId);
        result(null, response);
    })
}

module.exports = User;