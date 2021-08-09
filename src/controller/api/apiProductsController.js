const { Product, Brand, Category, Image } = require('../../database/models');
const { Op } = require("sequelize");


const apiProductsController = {

    list: async (req, res) => {     
        
        let response = {
            count: 0,
            countByCategory: [{ 
                /***********NUEVO***********/
                id: 1,
                name: 'Cámaras',
                quantity: 0
            },
            {
                id: 2,
                name: 'Trípodes',
                quantity: 0
            },
            {
                id: 3,
                name: 'Otros accesorios',
                quantity: 0
                // camaras: 0,
                // tripodes: 0,
                // otros_accesorios: 0
                /***********NUEVO***********/
            }],
            products: [],            
            status: 0,
        };
        
        let aux1 = 0;
        let aux2 = 0;
        let aux3 = 0;

        try{
            let products = await Product.findAndCountAll({ 
                include: ['brand', 'category', 'images']}
            );

            response.count = products.rows.length;

            /***********VIEJO***********/
            //let categories = await Category.findAll();
                    
            // categories.forEach( category => {
            //     response.countByCategory[category.name] = 0;            
            // });
            /***********VIEJO***********/
            response.products = products.rows.map( row => {
                /***********VIEJO***********/
                //response.countByCategory[row.category.name]++;
                /***********VIEJO***********/
                /***********NUEVO***********/
                if (row.category.id == 1) {
                    aux1++;
                } else if (row.category.id == 2) {
                    aux2++;
                } else if (row.category.id == 3) {
                    aux3++;
                }
                
                response.countByCategory[0].quantity = aux1;
                response.countByCategory[1].quantity = aux2;
                response.countByCategory[2].quantity = aux3;
                /***********NUEVO***********/

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
            product: [],
            images: [],
            relations: [],
            status: 0,
        };

        try{
            let product = await Product.findByPk(req.params.id, { 
                include: ['brand', 'category', 'images']}
            );
            
            let producto = {

                id : product.id,
                name : product.name,
                model : product.model,
                description : product.description,
                specs : product.specs,
                keywords : product.keywords,
                price : product.price,
                discount : product.discount,
                stock : product.stock,
                stockMin : product.stockMin,
                stockMax : product.stockMax,
                category : product.category.name,
                brand : product.brand.name,
            
            }

            response.product.push(producto);


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