/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Comment = require("../models/CommentModel");
const { INTERNAL_SERVER_ERROR, INSERT_SUCCESS } = require("../helpers/error-msg");

// Create and save
let create = (req, result) => {
    // // Validate request
    // if (!req.body) {
    //     result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    // }

    // // Get data from body
    // const comment = req.body
    // const obj_comment = new Comment(comment);
    // console.log(obj_comment);

    // // Save in database
    // Comment.create(obj_comment, (err, res) => {
    //     if (err) {
    //         result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
    //     }
    //     else result.send({
    //         code: 0,
    //         message: INSERT_SUCCESS,
    //         data: res
    //     });
    // });
}

// Create review company and save
let createReviewCompany = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }

    // Get data from body
    const comment = req.body
    const obj_comment = new Comment(comment);
    console.log(obj_comment);

    // Save in database
    Comment.create(obj_comment, (err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }

        else {
            console.log(res);
            result.send({
                code: 0,
                message: INSERT_SUCCESS,
                data: res
            });
        }
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

// Find a single with a ID
let findAllReviewByCompanyId = (req, result) => {
    var queryData = req.query;
    let companyId = req.params.companyId;
    console.log(queryData);
    Comment.getAllReviewByCompanyId(queryData, companyId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.send({
                    code: 0,
                    message: "",
                    data: []
                });
            } else {
                result.status(500).send({ message: "Error retrieving comment with company id " + companyId });
            }
        }
        else {
            result.send({
                code: 0,
                message: "",
                data: res
            });
        }
    })
}

// Find a single with a ID
let findAllReplyReviewBy = (req, result) => {
    var queryData = req.query;
    let companyId = req.params.companyId;
    console.log(queryData);
    Comment.getAllReviewByCompanyId(queryData, companyId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.send({
                    code: 0,
                    message: "",
                    data: []
                });
            } else {
                result.status(500).send({ message: "Error retrieving comment with company id " + companyId });
            }
        }
        else {
            result.send({
                code: 0,
                message: "",
                data: res
            });
        }
    })
}

// Retrieve 7 from the database.
let get7NewComment = (req, result) => {
    Comment.get7NewComment((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        } else {
            result.send({
                code: 0,
                message: "",
                data: res
            })
        };
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
    get7NewComment: get7NewComment,
    findAllReviewByCompanyId: findAllReviewByCompanyId,
    findAllReplyReviewBy: findAllReplyReviewBy,
    createReviewCompany: createReviewCompany
}