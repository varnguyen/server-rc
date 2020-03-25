/**
 * @Created by MinJa 
 * on 14/03/2020.
 */

'use strict';

const db = require("../database/db");

const Comment = function (comment) {
    this.user_id = comment.user_id;
    this.company_id = comment.company_id;
    this.comment = comment.comment;
    this.deleted = 0;
    this.review_id = comment.review_id;
    this.is_review = comment.is_review;
    this.who_id = comment.who_id;
    this.date_add = new Date();
    this.date_upd = new Date();
}

Comment.create = function (comment, result) {
    let sql = 'INSERT INTO rc_comments SET ?'
    db.query(sql, [comment], (err, response) => {
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
Comment.getAllReviewByCompanyId = function (queryData, companyId, result) {
    var { page, row } = queryData;
    const limit = (page - 1) * row + ',' + row;
    let sql = 'SELECT * FROM rc_comments WHERE company_id = ? AND is_review = 1 ORDER BY cmt_id DESC';
    if (page && row) {
        sql += ` LIMIT ${limit}`;
    }
    db.query(sql, [companyId], (err, response) => {
        if (err) {
            result(null, err);
            return;
        }
        if (response.length) {
            result(null, response);
            return;
        }
        // not found comment with the company id
        result({ kind: "not_found" }, null);
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