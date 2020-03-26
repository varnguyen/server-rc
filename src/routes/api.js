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
const CommentsController = require("../controllers/CommentsController");

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
    // #########################################
    // ################ Frontend ###############

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
    router.get("/api/company/:companyId/comment", CommentsController.findAllReviewByCompanyId);
    router.post("/api/company/comment", CommentsController.createReviewCompany);
    router.post("/api/company", CompanysController.create);
    router.get("/api/company/:companyId", CompanysController.findOne);
    router.get("/api/statistic-review", CompanysController.getCompanyByTotalReview);

    // router.put("/api/company/:companyId", CompanysController.update);
    // router.delete("/api/company/:companyId", CompanysController.remove);

    // Comment
    router.get("/api/statistic-comment", CommentsController.get7NewComment);
    router.get("/api/comment", CommentsController.findAll);
    router.post("/api/comment", CommentsController.create);
    router.get("/api/comment/:commentId", CommentsController.findOne);
    router.put("/api/comment/:commentId", CommentsController.update);
    router.delete("/api/comment/:commentId", CommentsController.remove);
    // Users
    router.get("/api/users", UsersController.findAll);
    router.post("/api/users", UsersController.create);
    router.get("/api/users/:userId", UsersController.findOne);
    router.put("/api/users/:userId", UsersController.update);
    router.delete("/api/users/:userId", UsersController.remove);

    // #########################################
    // ################ Backend ###############

    // User authMiddleware.isAuth before api need Auth
    router.use(AuthMiddleWare.isAuth);

    // #########################################
    // ################ Frontend ###############

    // Profile
    router.get("/api/me/profile", UsersController.getUserInfo);
    router.post("/api/me/update", UsersController.update);

    // #########################################
    // ################ Backend ###############

    return app.use("/", router);
}
module.exports = initAPIs;