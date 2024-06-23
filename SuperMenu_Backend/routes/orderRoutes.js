const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/ordersController");
const auth = require("../middlewares/auth");
router.post("/create/order",auth,createOrder);
router.get('/order/all',auth,getAllOrders)

module.exports.OrderRoutes = router;