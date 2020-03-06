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
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {

    router.post("/auth/login", AuthController.login);
    router.post("/auth/refresh-token", AuthController.refreshToken);

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(AuthMiddleWare.isAuth);

    // Users
    router.get("/user/me/profile", UsersController.getUserInfo);

    router.get("/users", UsersController.userLists);
    router.post("/users", UsersController.createUser);
    router.get("/users/:userId", UsersController.userDetail);
    router.put("/users/:userId", UsersController.updateUserInfo);
    router.delete("/users/:userId", UsersController.deleteUser);

    // Companys
    router.get("/companys", CompanysController.companyLists);
    router.post("/companys", CompanysController.createCompany);
    router.get("/companys/:companyId", CompanysController.companyDetail);
    router.put("/companys/:companyId", CompanysController.updateCompanyInfo);
    router.delete("/companys/:companyId", CompanysController.deleteCompany);

    // Products
    router.get("/products", ProductsController.productLists);
    router.post("/products", ProductsController.createProduct);
    router.get("/products/:productId", ProductsController.productDetail);
    router.put("/products/:productId", ProductsController.updateProduct);
    router.delete("/products/:productId", ProductsController.deleteProduct);


    return app.use("/", router);
}
module.exports = initAPIs;