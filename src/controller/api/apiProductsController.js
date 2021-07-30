const { Product, Brand, Category, Image } = require('../../database/models');
const { Op } = require("sequelize");


const apiProductsController = {

    list: async (req, res) => {     
        
        let response = {
            count: 0,
            countByCategory: {},
            products: [],
            status: 0,
        };
        
        let products = await Product.findAll({ 
            include: ['brand', 'category', 'images']}
        );

        let categories = await Category.findAll();

        response.count = products.length;
        response.products = products;
        response.status = 200;

        return res.json(response);
            
    },
    
};


module.exports = apiProductsController;