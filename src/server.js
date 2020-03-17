const express = require('express')
const cors = require('cors')
const expressValidator = require('express-validator')
const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
require('dotenv').config()
const port = process.env.PORT || 3001

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type: application/json
app.use(expressValidator())


let routes = require('./routes/api') //importing route
routes(app)

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)
console.log('RESTful API server started on: ' + port)

const bcrypt = require("bcrypt");
console.log(bcrypt.hashSync('123456', 10));


