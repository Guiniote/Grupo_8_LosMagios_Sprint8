'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('States', [
      {
        id: 1,
        name: 'Pendiente de pago',      
      },
      {
        id: 2,
        name: 'Pendiente de entrega',      
      },
      {
        id: 3,
        name: 'En camino',      
      },
      {
        id: 4,
        name: 'Entregado',      
      }  
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('States', null, {});

  }
};
