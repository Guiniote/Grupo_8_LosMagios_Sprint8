'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Courses', [
      {
        id: 1,
        name: 'Curso de fotografía 1',
        description: 'Curso básico de fotografía',
        keywords: 'Fotografía',
        image: '1625003612115_img.jpeg',
        duration: 10,
        level: 'Amateur',
        price: 8000,
        discount: 0,
        initialCapacity: 20,
        minimalCapacity: 5,
        actualCapacity: 20,      
      },
      {
        id: 2,
        name: 'Curso de fotografía 2',
        description: 'Curso avanzado de fotografía',
        keywords: 'Fotografía',
        image: '1625003612117_img.jpg',
        duration: 15,
        level: 'Semi profesional',
        price: 22000,
        discount: 0,
        initialCapacity: 10,
        minimalCapacity: 3,
        actualCapacity: 10,      

      },
      {
        id: 3,
        name: 'Curso de filmación',
        description: 'Curso básico de filmación',
        keywords: 'Filmación',
        image: '1625003612119_img.png',
        duration: 12,
        level: 'Amateur',
        price: 18000,
        discount: 0,
        initialCapacity: 15,
        minimalCapacity: 5,
        actualCapacity: 15,      

      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Courses', null, {});

  }
};
