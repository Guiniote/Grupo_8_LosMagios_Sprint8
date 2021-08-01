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
        
        try{
            let products = await Product.findAndCountAll({ 
                include: ['brand', 'category', 'images']}
            );

            response.count = products.rows.length;


            let categories = await Category.findAll();
                    
            categories.forEach( category => {
                response.countByCategory[category.name] = 0;            
            });

            response.products = products.rows.map( row => {
                response.countByCategory[row.category.name]++;

                let product = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    images: row.images.map(image => image.name),
                    detail: 'http://' + req.headers.host + `/api/products/${row.id}`
                }
                return product;
            })

            response.status = 200;
        }
        
        catch{
            response.status = 500;
        }

        
        return res.json(response);
            
    },

    listById: async (req, res) => {

        let response = {
            product: {},
            images: [],
            relations: [],
            status: 0,
        };

        try{
            let product = await Product.findByPk(req.params.id, { 
                include: ['brand', 'category', 'images']}
            );
            
            response.product.id = product.id
            response.product.name = product.name
            response.product.model = product.model
            response.product.description = product.description
            response.product.specs = product.specs
            response.product.keywords = product.keywords
            response.product.price = product.price
            response.product.discount = product.discount
            response.product.stock = product.stock
            response.product.stockMin = product.stockMin
            response.product.stockMax = product.stockMax
            response.product.category = product.category.name
            response.product.brand = product.brand.name
            
            let imagenes = [];
            product.images.forEach(image => { imagenes.push(image.name)})

            response.images = imagenes.map(image => 'http://' + req.headers.host + `/images/${image}`)

            response.relations = [{brand: product.brand.name}, {category: product.category.name}, {images: imagenes}]

            response.status = 200;
        }

        catch {
            response.status = 500;            
        }

        
        return res.json(response);

    }
};


module.exports = apiProductsController;