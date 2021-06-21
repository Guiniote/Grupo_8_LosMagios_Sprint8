'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.State);
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderDetail,{
        foreingnKey: 'orderId',
        as: 'orderDetails'
      })
    }
  };
  Order.init({
    orderNumber: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};