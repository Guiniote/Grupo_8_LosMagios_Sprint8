'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Brand, { as: 'brand' });
      Product.belongsTo(models.Category, { as: 'category' });
      Product.hasMany(models.Image,{
        foreignKey: 'productId',
        as: 'images',
      })
      Product.hasOne(models.OrderDetail,{
        foreignKey: 'productId',
        as: 'orderDetails',
      })
    }
  };
  Product.init({
    name: { type: DataTypes.STRING, allowNull: false },
    model: DataTypes.STRING,
    description: DataTypes.TEXT,
    specs: DataTypes.TEXT,
    keywords: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    discount: DataTypes.INTEGER,
    stock: { type: DataTypes.INTEGER, allowNull: false },
    stockMin: { type: DataTypes.INTEGER, allowNull: false },
    stockMax: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    brandId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};