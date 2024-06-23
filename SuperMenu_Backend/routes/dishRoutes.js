const express = require("express");
const router = express.Router();
const { createDish, getAllDishes,deleteDish,deleteAllDishes } = require("../controllers/dishesController");
const auth = require("../middlewares/auth");
const upload = require('../middlewares/multer');
router.post("/create/dish",auth, upload.single('image'),createDish);
router.get('/dish/all',getAllDishes);
router.delete('/dish/delete/:id',auth,deleteDish);
router.delete('/dish/deleteAll',auth,deleteAllDishes);


module.exports.dishRoutes = router;