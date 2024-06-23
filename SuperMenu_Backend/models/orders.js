const { DataTypes } = require('sequelize');
const sequelize = require('../middlewares/sequelize');
const Restaurant = require('./restaurant');
const Dish= require('../models/dishes')

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurant',
      key: 'id'
    }
  },
  dishId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
       model:'Dish',
       key:'id' 
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});
Dish.hasMany(Order, { foreignKey: 'dishId' });
Order.belongsTo(Dish, { foreignKey: 'dishId' });

Restaurant.hasMany(Order,{foreignKey:'restaurantId'})
Order.belongsTo(Restaurant,{foreignKey:'restaurantId'})

module.exports = Order;
