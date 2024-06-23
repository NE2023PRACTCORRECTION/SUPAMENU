const Restaurant = require('../models/restaurant');
const cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");


cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret
});


  let uploadFromBuffer = (req) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: "super_menu"
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier
        .createReadStream(req.files.image.data) // Change this line to req.files.cv.data
        .pipe(cld_upload_stream);
    });
  };


exports.createRestaurant = async (req, res) => {
   try {
     const result = await uploadFromBuffer(req);
     const image = result.url;

     const { address, place, menu } = req.body;

     if (!address || !place || !menu) {
       return res.status(400).json({ error: "All fields are required" });
     }

     const restaurant = await Restaurant.create({
       address,
       place,
       menu,
       image
     });

     res.status(201).json({ restaurant });
   } catch (error) {
     console.error("Error creating restaurant:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 };





// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (restaurant) {
      await restaurant.update(req.body);
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (restaurant) {
      await restaurant.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
