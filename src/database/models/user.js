'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order,{
        foreignKey: 'userId',
        as: 'orders',
      })
    }
  };
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    telephone: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};