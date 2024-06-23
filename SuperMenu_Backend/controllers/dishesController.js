const Dish = require('../models/dishes');
const Menu = require('../models/menu');
const fs = require('fs');
const path = require('path');
exports.createDish = async (req, res) => {
  try {
    const { name, price, menuId, description } = req.body;

    // Validate input
    if (!name || !price || !menuId || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if menu exists
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    // Handle file upload
    let picturePath = null;
    if (req.file) {
      const uploadsDir = path.join(__dirname, '../uploads');
      const fileName = req.file.filename;

      // Move the uploaded file to the uploads directory
      fs.renameSync(req.file.path, path.join(uploadsDir, fileName));

      // Construct the file path for storage
      picturePath = `/uploads/${fileName}`;
    }

    // Create dish
    const dish = await Dish.create({
      name,
      price,
      description,
      picture: picturePath,
      menuId
    });

    res.status(201).json(dish);
  } catch (error) {
    console.error('Error creating dish:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
  // Get all dishes
  exports.getAllDishes = async (req, res) => {
    try {
      const dishes = await Dish.findAll({include:Menu});
      res.status(200).json({ dishes });
    } catch (error) {
      console.error('Error fetching dishes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.deleteDish = async (req, res) => {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'dish not found' });
      }
    await dish.destroy();
      res.status(204).json({ error: 'Deleted successfully' });
    } catch (error) {
      console.error('Delete dish Error:', error);
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteAllDishes = async (req, res) => {
    try {
      console.log("here")
      await Dish.destroy({
        where: {}, // This empty condition matches all records
      });
      
      res.status(200).json({ message: 'All dishes have been deleted' });
    } catch (error) {
      console.error('Error deleting all dishes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };