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
      User.belongsTo(models.Avatar);
      User.hasMany(models.Order,{
        foreignKey: 'userId',
        as: 'orders',
      })
    }
  };
  User.init({
    userName: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    telephone: DataTypes.STRING,
    avatarId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};