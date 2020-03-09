const express = require('express')
const cors = require('cors')
const expressValidator = require('express-validator')
const app = express()

app.use(cors())

const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator())

let routes = require('./routes/api') //importing route
routes(app)

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('RESTful API server started on: ' + port)