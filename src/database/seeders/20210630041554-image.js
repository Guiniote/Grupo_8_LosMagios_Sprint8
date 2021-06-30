'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Images', [
      {
        id: 1,
        name: '1625003614110_img.png',   
        productId: 1,
      },
      {
        id: 2,
        name: '1625003614111_img.png',   
        productId: 1,
      },
      {
        id: 3,
        name: '1625003614112_img.png',   
        productId: 1,      
      },
      {
        id: 4,
        name: '1625003614113_img.png',   
        productId: 1,      
      },
      {
        id: 5,
        name: '1625003614114_img.png',   
        productId: 1,      
      },
      {
        id: 6,
        name: '1625003615111_img.jpg',   
        productId: 2,
      },
      {
        id: 7,
        name: '1625003615112_img.jpg',   
        productId: 2,      
      },
      {
        id: 8,
        name: '1625003616111_img.png',   
        productId: 3,
      },
      {
        id: 9,
        name: '1625003616112_img.png',   
        productId: 3,      
      },
      {
        id: 10,
        name: '1625003616113_img.png',   
        productId: 3,      
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Images', null, {});

  }
};
