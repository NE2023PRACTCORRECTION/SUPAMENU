// const User = require('../models/user');
// const Restaurant = require('../models/restaurant');
// const Menu = require('../models/menu');
// const Dish = require('../models/dish');
// const Order = require('../models/order');

// // Associations
// User.hasMany(Order, { foreignKey: 'userId' });
// Order.belongsTo(User, { foreignKey: 'userId' });

// Restaurant.hasMany(Menu, { foreignKey: 'restaurantId' });
// Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

// Menu.hasMany(Dish, { foreignKey: 'menuId' });
// Dish.belongsTo(Menu, { foreignKey: 'menuId' });

// Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
// Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

// module.exports = { User, Restaurant, Menu, Dish, Order };
