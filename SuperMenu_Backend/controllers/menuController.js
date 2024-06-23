const Menu = require('../models/menu');
const Restaurant=require('../models/restaurant')



exports.createMenu = async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.body.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const menu = await Menu.create({
        name: req.body.name,
        description: req.body.description,
        restaurantId: req.body.restaurantId
      });
  
      res.status(201).json(menu);
    } catch (error) {
      console.error('Create Menu Error:', error);
      res.status(400).json({ error: error.message });
    }
  };
  exports.getAllMenu=async (req,res)=>{
    try{
        const menus= await Menu.findAll({include:Restaurant})
        res.status(200).json(menus)

    }catch(err){
        res.status(400).json({ error: err.message });
    }
  }

  exports.getMenusByRestaurant = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const menus = await Menu.findAll({ where: { restaurantId } });
  
      if (menus.length === 0) {
        return res.status(404).json({ error: 'No menus found for this restaurant' });
      }
  
      res.status(200).json(menus);
    } catch (error) {
      console.error('Get Menus Error:', error);
      res.status(400).json({ error: error.message });
    }
  };

  exports.updateMenu = async (req, res) => {
    try {
      const menu = await Menu.findByPk(req.params.id);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
  
      await menu.update(req.body);
      res.status(200).json(menu);
    } catch (error) {
      console.error('Update Menu Error:', error);
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteMenu = async (req, res) => {
    try {
      const menu = await Menu.findByPk(req.params.id);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
    await menu.destroy();
      res.status(204).json({ error: 'Deleted successfully' });
    } catch (error) {
      console.error('Delete Menu Error:', error);
      res.status(400).json({ error: error.message });
    }
  };