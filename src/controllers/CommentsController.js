/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Comment = require("../models/CommentModel");
const { INTERNAL_SERVER_ERROR } = require("../helpers/error-msg");

// Create and save
let create = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }

    // Get data from body
    const { user_id, company_id, comment, deleted } = req.body
    const obj_comment = new Compnay({ user_id, company_id, comment, deleted });

    // Save in database
    Comment.create(obj_comment, (err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }
        else result.send({ res, message: INSERT_SUCCESS });
    });
}

// Retrieve all from the database.
let findAll = (req, result) => {
    Comment.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        } else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Retrieve 7 from the database.
let get7NewComment = (req, result) => {
    Comment.get7NewComment((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        } else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Find a single with a ID
let findOne = (req, result) => {
    let commentId = req.params.commentId;
    Comment.findById(commentId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found comment with id ${commentId}.` });
            } else {
                result.status(500).send({ message: "Error retrieving comment with id " + commentId });
            }
        }
        else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Update by ID
let update = (req, result) => {
    // Validate Request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }
    let data = req.body;
    let cmtId = data.cmt_id;
    Comment.updateById(cmtId, new Comment(data), (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found comment with id ${cmtId}.` });
            } else {
                result.status(500).send({ message: "Error updating comment with id " + cmtId });
            }
        } else result.send(res);
    });
}

// Delete by ID
let remove = (req, result) => {
    let cmtId = req.params.cmtId;
    Comment.remove(cmtId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found comment with id ${cmtId}.` });
            } else {
                result.status(500).send({ message: "Could not delete comment with id " + cmtId });
            }
        }
        else result.send({ message: DELETE_SUCCESS });
    })
}

module.exports = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    update: update,
    remove: remove,
    get7NewComment: get7NewComment
}