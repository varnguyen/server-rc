/**
 * @Created by MinJa 
 * on 05/03/2020.
 */

const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const ValidateController = require("../controllers/ValidateController");
const UsersController = require("../controllers/UsersController");
const CompanysController = require("../controllers/CompanysController");
const ProvincesController = require("../controllers/ProvincesController");
const JobsController = require("../controllers/JobsController");

/**
 * Init all APIs on your application
 * @param {*} app from express
 */

let initAPIs = (app) => {
    // Login
    router.post("/api/auth/login", AuthController.login);

    // Refresh Token
    router.post("/api/auth/refresh-token", AuthController.refreshToken);

    // Register
    router.post("/api/auth/register",
        ValidateController.validate('createUser'),
        UsersController.create
    );

    // Province
    router.get("/api/province", ProvincesController.findAll);

    // Job
    router.get("/api/job-type", JobsController.findAll);

    // Companys
    router.get("/api/company", CompanysController.findAll);
    router.post("/api/company", CompanysController.create);
    router.get("/api/company/:companyId", CompanysController.findOne);

    // User authMiddleware.isAuth before api need Auth
    router.use(AuthMiddleWare.isAuth);

    // Users
    router.get("/api/me/profile", UsersController.getUserInfo);
    router.post("/api/me/update", UsersController.update);

    return app.use("/", router);
}
module.exports = initAPIs;