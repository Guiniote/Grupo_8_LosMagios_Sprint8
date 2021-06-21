'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Product);
      OrderDetail.belongsTo(models.Service);
      OrderDetail.belongsTo(models.Course);
      OrderDetail.belongsTo(models.Order);
    }
  };
  OrderDetail.init({
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};