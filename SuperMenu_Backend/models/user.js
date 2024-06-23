const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../middlewares/sequelize");

class User extends Model {
    async generateAuthToken() {
      const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });
      return token;
    }
  }

 User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullnames: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

 
}, 

{
    sequelize,
    modelName: "User", 
    timestamp:true 
  
});

module.exports = User;
