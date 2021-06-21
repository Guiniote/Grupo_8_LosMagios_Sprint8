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
      Product.belongTo(models.Brand);
      Product.belongTo(models.Category);
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
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.TEXT,
    specs: DataTypes.TEXT,
    keywords: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    stockMin: DataTypes.INTEGER,
    stockMax: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};