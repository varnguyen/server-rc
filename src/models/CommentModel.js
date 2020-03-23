/**
 * @Created by MinJa 
 * on 14/03/2020.
 */

'use strict';

const db = require("../database/db");

const Comment = function (comment) {
    this.cmt_id = comment.cmt_id;
    this.user_id = comment.user_id;
    this.company_id = comment.company_id;
    this.comment = comment.comment;
    this.deleted = comment.deleted;
    this.date_add = comment.date_add;
    this.date_upd = new Date();
}

Comment.create = function (comment, result) {
    let sql = 'INSERT INTO rc_comments SET ?'
    db.query(sql, [company], (err, response) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, { cmt_id: response.insertId, ...comment });
        }
    })
}
Comment.getAll = function (result) {
    let sql = 'SELECT * FROM rc_comments'
    db.query(sql, (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, response);
    })
}
Comment.get7NewComment = function (result) {
    const deleted = 0;
    let sql = "SELECT * FROM rc_comments WHERE deleted = ? ORDER BY cmt_id DESC LIMIT 0,7";
    db.query(sql, [deleted], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, response);
    })
}
Comment.findById = function (cmtId, result) {
    let sql = 'SELECT * FROM rc_comments WHERE cmt_id = ?'
    db.query(sql, [cmtId], (err, response) => {
        if (err) {
            result(err, null);
            return;
        }
        if (response.length) {
            result(null, response[0]);
            return;
        }
        // not found comment with the id
        result({ kind: "not_found" }, null);
    })
}
Comment.updateById = function (cmtId, comment, result) {
    let sql = 'UPDATE rc_comments SET ? WHERE cmt_id = ?'
    db.query(sql, [comment, cmtId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found comment with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { cmt_id: cmtId, ...comment });
    })
}
Comment.remove = function (cmtId, result) {
    let sql = 'DELETE FROM rc_comments WHERE cmt_id = ?';
    db.query(sql, [cmtId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.affectedRows == 0) {
            // not found comment with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, response);
    })
}
module.exports = Comment;