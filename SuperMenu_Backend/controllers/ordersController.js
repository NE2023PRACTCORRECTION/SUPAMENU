const Order = require('../models/orders');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Dish = require('../models/dishes');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, dishId, totalAmount } = req.body;

    // Validate input
    if (!userId || !restaurantId || !dishId || !totalAmount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if related entities exist
    const user = await User.findByPk(userId);
    const restaurant = await Restaurant.findByPk(restaurantId);
    const dish = await Dish.findByPk(dishId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    if (!dish) return res.status(404).json({ error: 'Dish not found' });

    // Create order
    const order = await Order.create({ userId, restaurantId, dishId, totalAmount });
    res.status(201).json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all orders with their related data
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [User, Restaurant, Dish] });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};