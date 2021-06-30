'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Brands', [
    {
      id: 1,
      name: 'Nikon',      
    },
    {
      id: 2,
      name: 'Canon',      
    },
    {
      id: 3,
      name: 'Kodak',      
    },
    {
      id: 4,
      name: 'Genérico',      
    }
   ]);
  
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};
