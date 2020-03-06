'use strict'

const Company = require('../models/CompanyModel');

let companyLists = (req, result) => {
    Company.getAllCompany((err, response) => {
        if (err) throw err
        return result.status(200).json(response)
    })
}
let companyDetail = (req, result) => {
    let companyId = req.params.companyId;
    Company.getCompanyById(companyId, (err, response) => {
        if (err) throw err
        if (response.length > 0) {
            return result.status(200).json(response[0])
        }
        return result.status(200).json({ message: 'Company Not Found!' })
    })
}
let updateCompanyInfo = (req, result) => {
    let data = req.body;
    let companyId = req.params.companyId;
    Company.updateCompanyById(companyId, new Company(data), (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Update success!' })
    })
}
let createCompany = (req, result) => {
    let data = req.body;
    Company.createCompany(new Company(data), (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Insert success!' })
    })
}
let deleteCompany = (req, result) => {
    let companyId = req.params.companyId;
    Company.removeCompany(companyId, (err, response) => {
        if (err) throw err
        return result.status(200).json({ message: 'Delete success!' })
    })
}

module.exports = {
    companyLists: companyLists,
    companyDetail: companyDetail,
    updateCompanyInfo: updateCompanyInfo,
    createCompany: createCompany,
    deleteCompany: deleteCompany
}