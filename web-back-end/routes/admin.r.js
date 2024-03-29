//handle request from client
const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin.c");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const orderRouter = require("./orderRoute");
route.get("/", adminController.Home);
route.route("/getAll").get(adminController.getAllAccount);
route.post("/", adminController.Home);
route.use("/product", productRouter);
route.use("/category", categoryRouter);
route.use("/orders", orderRouter);
route.delete("/user/:id", adminController.DeleteUser);
route.get("/user/:id", adminController.DetailUser);
route.post("/user/:id", adminController.DetailUser);
module.exports = route;
