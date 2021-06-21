'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.INTEGER
      },
      initialCapacity: {
        type: Sequelize.INTEGER
      },
      minimalCapacity: {
        type: Sequelize.INTEGER
      },
      actualCapacity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};