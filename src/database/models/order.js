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
    orderNumber: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    date: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, allowNull: false },
    stateId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};