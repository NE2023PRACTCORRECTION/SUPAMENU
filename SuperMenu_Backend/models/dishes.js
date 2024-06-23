const { DataTypes } = require('sequelize');
const sequelize = require('../middlewares/sequelize');
const Menu= require('../models/menu')
const Dish = sequelize.define('Dish', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture:{
    type:DataTypes.STRING,
    allowNull:true
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Menu',
      key: 'id'
    }
  }
}, {
  timestamps: true
});
Menu.hasMany(Dish, { foreignKey: 'menuId' });
Dish.belongsTo(Menu, { foreignKey: 'menuId' });

module.exports = Dish;
