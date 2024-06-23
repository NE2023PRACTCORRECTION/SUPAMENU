const express = require("express");
const router = express.Router();
const { createUser,loginUser, getUsers } = require("../controllers/userController");

router.post("/user/create",createUser); 
router.post("/user/login", loginUser); 
router.get("/user/all",getUsers);


module.exports.userRoutes = router;