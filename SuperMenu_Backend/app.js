const express= require("express");
const app = express();

const bodyParser= require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const sequelize = require("./middlewares/sequelize"); 
const {userRoutes} = require("./routes/userRoutes");
const { restaurantRoutes } = require("./routes/restaurantRoutes");
const { menuRoutes } = require("./routes/menuRoutes");
const { dishRoutes } = require("./routes/dishRoutes");
const { OrderRoutes } = require("./routes/orderRoutes");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const fileupload = require("express-fileupload");



app.use(cors({}));
var option={
    explore:true
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileupload());
const upload = multer({ dest: "./dtreat_images" });
var type = upload.single("recfile");

app.use(userRoutes);
app.use(restaurantRoutes)
// app.use(menuRoutes)
// app.use(dishRoutes)
// app.use(OrderRoutes)



app.use("/", (req, res) => {
    if (req.method === "GET") {
      res.send(`
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="./public/css/styles.css">
          </head>
          <body>
            <h1 class="greeting">Welcome to Restful Backend!</h1>
          </body>
        </html>
      `);
    }
  });

  sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });