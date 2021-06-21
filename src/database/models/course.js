'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasOne(models.OrderDetail,{
        foreignKey: 'courseId',
        as: 'orderDetails',
      })
    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    keywords: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    level: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    initialCapacity: DataTypes.INTEGER,
    minimalCapacity: DataTypes.INTEGER,
    actualCapacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};