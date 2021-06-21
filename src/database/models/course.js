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
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    keywords: DataTypes.STRING,
    image: DataTypes.STRING,
    duration: { type: DataTypes.INTEGER, allowNull: false },
    level: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    discount: DataTypes.INTEGER,
    initialCapacity: { type: DataTypes.INTEGER, allowNull: false },
    minimalCapacity: { type: DataTypes.INTEGER, allowNull: false },
    actualCapacity: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};