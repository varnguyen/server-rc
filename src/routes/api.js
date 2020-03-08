/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/routes/api.js
 */
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const ProductsController = require("../controllers/ProductsController");
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
    router.post("/api/register", UsersController.createUser);
    // Province
    router.get("/api/province", ProvincesController.provinceLists);
    // Job
    router.get("/api/job", JobsController.JobLists);
    // Companys
    router.get("/api/company", CompanysController.companyLists);
    router.post("/api/company", CompanysController.createCompany);
    router.get("/api/company/:companyId", CompanysController.companyDetail);
    router.put("/api/company/:companyId", CompanysController.updateCompanyInfo);
    router.delete("/api/company/:companyId", CompanysController.deleteCompany);


    // User authMiddleware.isAuth before api need Auth
    router.use(AuthMiddleWare.isAuth);

    // Users
    router.get("/api/me/profile", UsersController.getUserInfo);

    router.get("/api/users", UsersController.userLists);
    router.post("/api/users", UsersController.createUser);
    router.get("/api/users/:userId", UsersController.userDetail);
    router.put("/api/users/:userId", UsersController.updateUserInfo);
    router.delete("/api/users/:userId", UsersController.deleteUser);



    // Products
    router.get("/api/products", ProductsController.productLists);
    router.post("/api/products", ProductsController.createProduct);
    router.get("/api/products/:productId", ProductsController.productDetail);
    router.put("/api/products/:productId", ProductsController.updateProduct);
    router.delete("/api/products/:productId", ProductsController.deleteProduct);


    return app.use("/", router);
}
module.exports = initAPIs;