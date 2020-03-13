/**
 * @Created by MinJa 
 * on 08/03/2020
 */

'use strict'

const Company = require('../models/CompanyModel');

// Create and save a new company
let create = (req, result) => {
    // Validate request
    if (!req.body) {
        result.status(400).send({ message: "Content can not be empty!" });
    }

    // Create a company
    const { nick_name, email, password, gender } = req.body
    const company = new Compnay({ nick_name, email, password, gender });
    console.log("company", company);

    // Save company in the database
    Company.create(company, (err, res) => {
        console.log("err, data", err, res);
        if (err) {
            result.status(500).send({ message: err.message || "Internal Server Error." });
        }
        else result.send({ res, message: 'Insert success!' });
    });
}

// Retrieve all companys from the database.
let findAll = (req, result) => {
    Company.getAll((err, res) => {
        if (err) {
            result.status(500).send({ message: err.message || "Internal Server Error." });
        }
        else result.send({
            "code": 0,
            "message": "",
            "error": "",
            "data": res
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
        else result.send(res);
    })
}

// Update a company identified by the companyId in the request
let update = (req, result) => {
    // Validate Request
    if (!req.body) {
        result.status(400).send({ message: "Content can not be empty!" });
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
        else result.send({ message: `Company was deleted successfully!` });
    })
}

module.exports = {
    findAll: findAll,
    findOne: findOne,
    update: update,
    create: create,
    remove: remove
}