/**
 * @Created by MinJa 
 * on 08/03/2020.
 */

'use strict'

const Job = require("../models/JobModel");
const { INTERNAL_SERVER_ERROR } = require("../helpers/error-msg");

// Create and save 
let create = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }

    // Get data from body
    const { nick_name, email, password, gender } = req.body
    const job = new Compnay({ nick_name, email, password, gender });

    // Save in database
    Job.create(job, (err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }
        else result.send({ res, message: INSERT_SUCCESS });
    });
}

// Retrieve all from the database.
let findAll = (req, result) => {
    Job.getAll((err, res) => {
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
    let jobId = req.params.jobId;
    Job.findById(jobId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found job with id ${jobId}.` });
            } else {
                result.status(500).send({ message: "Error retrieving job with id " + jobId });
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
    let jobId = data.job_id;
    // let data = req.body;
    // let jobId = req.params.jobId;
    Job.updateById(jobId, new Job(data), (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found job with id ${jobId}.` });
            } else {
                result.status(500).send({ message: "Error updating job with id " + jobId });
            }
        } else result.send(res);
    });
}

// Delete by ID
let remove = (req, result) => {
    let jobId = req.params.jobId;
    Job.remove(jobId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found job with id ${jobId}.` });
            } else {
                result.status(500).send({ message: "Could not delete job with id " + jobId });
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
}