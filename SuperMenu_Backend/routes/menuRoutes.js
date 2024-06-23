const express = require("express");
const router = express.Router();
const { createMenu, getAllMenu,deleteMenu } = require("../controllers/menuController");
const auth = require("../middlewares/auth");
router.post("/create/menu",auth,createMenu);
router.get('/menu/all',getAllMenu)
router.delete('/menu/delete/:id',auth,deleteMenu)
module.exports.menuRoutes = router;