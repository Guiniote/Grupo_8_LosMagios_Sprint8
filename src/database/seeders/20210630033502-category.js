'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Cámaras',      
      },
      {
        id: 2,
        name: 'Trípodes',      
      },
      {
        id: 3,
        name: 'Otros accesorios',      
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
