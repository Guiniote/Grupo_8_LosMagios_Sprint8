'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      specs: {
        type: Sequelize.TEXT
      },
      keywords: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      stockMin: {
        type: Sequelize.INTEGER
      },
      stockMax: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands',
          key: 'id'
        }
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
    await queryInterface.dropTable('Products');
  }
};