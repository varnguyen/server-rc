'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../database/db')
const debug = console.log.bind(console);

let productLists = (req, res) => {
    debug();
    let sql = 'SELECT * FROM products'
    db.query(sql, (err, response) => {
        if (err) throw err
        return res.status(200).json(response)
    })
}
let productDetail = (req, res) => {
    debug();
    let sql = 'SELECT * FROM products WHERE id = ?'
    db.query(sql, [req.params.productId], (err, response) => {
        if (err) throw err
        return res.status(200).json(response[0])
    })
}
let updateProduct = (req, res) => {
    debug();
    let data = req.body;
    let productId = req.params.productId;
    let sql = 'UPDATE products SET ? WHERE id = ?'
    db.query(sql, [data, productId], (err, response) => {
        if (err) throw err
        return res.status(200).json({ message: 'Update success!' })
    })
}
let createProduct = (req, res) => {
    debug();
    let data = req.body;
    let sql = 'INSERT INTO products SET ?'
    db.query(sql, [data], (err, response) => {
        if (err) throw err
        return res.status(200).json({ message: 'Insert success!' })
    })
}
let deleteProduct = (req, res) => {
    debug();
    let sql = 'DELETE FROM products WHERE id = ?'
    db.query(sql, [req.params.productId], (err, response) => {
        if (err) throw err
        return res.status(200).json({ message: 'Delete success!' })
    })
}

module.exports = {
    productLists: productLists,
    productDetail: productDetail,
    updateProduct: updateProduct,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
}