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

let initBackendAPIs = (app) => {
    // Login
    router.post("/api_be/auth/login", AuthController.login);

    // Refresh Token
    router.post("/api_be/auth/refresh-token", AuthController.refreshToken);

    // Province
    router.get("/api_be/province", ProvincesController.findAll);

    // Job
    router.get("/api_be/job-type", JobsController.findAll);
    router.post("/api_be/job-type", JobsController.create);
    router.get("/api_be/job-type/:jobId", JobsController.findOne);
    router.put("/api_be/job-type/:jobId", JobsController.update);
    router.delete("/api_be/job-type/:jobId", JobsController.remove);

    // Companys
    router.get("/api_be/company", CompanysController.findAll);
    router.post("/api_be/company", CompanysController.create);
    router.get("/api_be/company/:companyId", CompanysController.findOne);
    router.put("/api_be/company/:companyId", CompanysController.update);
    router.delete("/api_be/company/:companyId", CompanysController.remove);

    // Users
    router.get("/api_be/users", UsersController.findAll);
    router.post("/api_be/users", UsersController.create);
    router.get("/api_be/users/:userId", UsersController.findOne);
    router.put("/api_be/users/:userId", UsersController.update);
    router.delete("/api_be/users/:userId", UsersController.remove);

    return app.use("/", router);
}
module.exports = initBackendAPIs;