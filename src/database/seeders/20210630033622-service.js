'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Services', [
      {
        id: 1,
        name: 'Fotografía pequeño',
        description: 'Pack de fotografías HD de producto pequeño',
        keywords: 'Pequeño',
        image: '1625003613110_img.jpeg',
        price: 4000,
        discount: 0,        
      },
      {
        id: 2,
        name: 'Fotografía mediano',
        description: 'Pack de fotografías HD de producto mediano',
        keywords: 'Mediano',
        image: '1625003613112_img.jpeg',
        price: 5500,
        discount: 0,
      },
      {
        id: 3,
        name: 'Fotografía grande',
        description: 'Pack de fotografías HD de producto grande',
        keywords: 'Grande',
        image: '1625003613114_img.jpeg',
        price: 10000,
        discount: 0,
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Services', null, {});

  }
};
