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
    // let sql1 = 'SELECT * FROM rc_comments LEFT JOIN rc_users ON rc_comments.user_id = rc_users.user_id LEFT JOIN comments ON rc_comments.article_id = comments.id_article';
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

    let sql = `SELECT 
    rc_comments.*, 
    rc_users.nick_name AS nick_name, 
    rc_companys.full_name AS full_name, 
    rc_companys.short_name AS company_short_name 
    FROM rc_comments 
    LEFT JOIN rc_users 
        ON rc_comments.user_id = rc_users.user_id 
    LEFT JOIN rc_companys 
        ON rc_comments.company_id = rc_companys.company_id 
    WHERE rc_comments.deleted = ? 
    ORDER BY rc_comments.cmt_id DESC 
    LIMIT 0,7`;

    let spl2 = 'SELECT * FROM rc_comments JOIN rc_users ON rc_users.user_id = rc_comments.user_id WHERE rc_comments.deleted = ? ORDER BY rc_comments.cmt_id DESC LIMIT 0,7';

    let sqqqq = `SELECT DISTINCT rc_comments.cmt_id,rc_comments.company_id,rc_comments.comment,rc_comments.user_id,rc_users.user_id,rc_users.nick_name,rc_users.email,rc_companys.company_id,rc_companys.full_name,rc_users.phone FROM rc_comments INNER JOIN rc_users ON rc_comments.user_id = rc_users.user_id INNER JOIN rc_companys ON rc_comments.company_id = rc_companys.company_id WHERE rc_comments.deleted = 0 ORDER BY rc_comments.cmt_id DESC  LIMIT 0,7`;

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