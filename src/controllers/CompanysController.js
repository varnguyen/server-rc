/**
 * @Created by MinJa 
 * on 08/03/2020
 */

'use strict'

const Company = require("../models/CompanyModel");
const { INTERNAL_SERVER_ERROR, INSERT_SUCCESS, DELETE_SUCCESS, CONTENT_CAN_NOT_EMPTY } = require("../helpers/error-msg");

// Create and save a new company
let create = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }

    // Create a company
    const company = req.body

    // Save company in the database
    Company.create(new Company(company), (err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }
        else result.send({
            code: 0,
            message: INSERT_SUCCESS,
            data: ""
        });
    });
}

// Retrieve all companys from the database.
let findAll = (req, result) => {
    var queryData = req.query;
    console.log("object", req.body);
    Company.getAll(queryData, (err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || INTERNAL_SERVER_ERROR });
        }
        else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Find a single company with a companyId
let findOne = (req, result) => {
    let companyId = req.params.companyId;
    Company.findById(companyId, (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found company with id ${companyId}.` }); // Company Not Found!
            } else {
                result.status(500).send({ message: "Error retrieving company with id " + companyId });
            }
        }
        else result.send({
            code: 0,
            message: "",
            data: res
        });
    })
}

// Update a company identified by the companyId in the request
let update = (req, result) => {
    // Validate Request
    if (!req.body) {
        result.status(400).send({ message: CONTENT_CAN_NOT_EMPTY });
    }
    let data = req.body;
    let companyId = data.company_id;
    // let data = req.body;
    // let companyId = req.params.companyId;
    Company.updateById(companyId, new Company(data), (err, res) => {
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found company with id ${companyId}.` });
            } else {
                result.status(500).send({ message: "Error updating company with id " + companyId });
            }
        } else result.send(res); // Update success!
    });
}

// Delete a company with the specified companyId in the request
let remove = (req, result) => {
    let companyId = req.params.companyId;
    Company.remove(companyId, (err, res) => {
        console.log("err remove ", err)
        if (err) {
            if (err.kind === "not_found") {
                result.status(404).send({ message: `Not found company with id ${companyId}.` });
            } else {
                result.status(500).send({ message: "Could not delete company with id " + companyId });
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