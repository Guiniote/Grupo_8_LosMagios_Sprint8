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
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    keywords: DataTypes.STRING,
    image: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};