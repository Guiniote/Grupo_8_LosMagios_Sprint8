'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Cámara Reflex Nikon 123',
        model: '123',
        description: 'Cámara profesional de fotos',
        specs: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa consequatur ducimus in labore ex esse quo sequi expedita deserunt.',
        keywords: 'Nikon',
        price: 35000,
        discount: 0,  
        stock: 8,
        stockMin: 2,
        stockMax: 10,
        categoryId: 1,
        brandId: 1,
      },
      {
        id: 2,
        name: 'Trípode A',
        model: 'ABC',
        description: 'Trípode para cámaras tamaño X',
        specs: '',
        keywords: 'Trípode',
        price: 10000,
        discount: 0,  
        stock: 5,
        stockMin: 2,
        stockMax: 15,
        categoryId: 2,
        brandId: 4,
      },
      {
        id: 3,
        name: 'Cámara Canon R',
        model: 'RSA442',
        description: 'Cámara digital',
        specs: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        keywords: 'Nikon',
        price: 22000,
        discount: 0,  
        stock: 12,
        stockMin: 4,
        stockMax: 20,
        categoryId: 1,
        brandId: 2,
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Products', null, {});

  }
};
