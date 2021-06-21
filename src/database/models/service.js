'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasOne(models.OrderDetail,{
        foreignKey: 'serviceId',
        as: 'orderDetails',
      })
    }
  };
  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    keywords: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};