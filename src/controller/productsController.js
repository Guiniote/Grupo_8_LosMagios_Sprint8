//const jsonDB = require('../model/productsModel');
//const productsModel = jsonDB('products');
//const db = require('../database/models');

const { Product, Brand, Category, Image  } = require('../database/models');
const { Op } = require("sequelize");



const productsController = {

// Función que muestra el formulario de crear Productos
    create: async (req, res) => {
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        res.render('products/createProducts', { brands, categories });
    },
    
// // Función que simula el almacenamiento, en este caso en array
//     store: (req, res) => {
//         const product = req.body;
//         product.image = req.file ? req.file.filename : '';
//         productsModel.create(product);
//         res.redirect('/products/productList');
//     },
    store: (req, res) => {
        const product = req.body;
        
        //product.image = req.file ? req.file.filename : '';
        Product.create(req.body)
            .then(productStored => {                
                productStored.addCategories(req.body.category); 
                productStored.addBrands(req.body.brand); 
                res.redirect('/products/productList');
            })
        .catch(error => res.send(error));
    },  
    
    // const product = await Product.create(req.body)
    //         //.then(productStored => {                
    //             await product.addCategories(req.body.category); 
    //             await product.addBrands(req.body.brand); 
    //             res.redirect('/products/productList');

// // Función que muestra la información almacenada
//     show: (req, res) => {
//         const product = productsModel.find(req.params.id);
//         if (product) {
//             res.render('products/productDetail', { product });
//         } else {
//             res.render('error404');
//         }
//     },

// // Función que borra información almacenada
//     destroy: (req, res) => {
//         productsModel.delete(req.params.id);
//         res.redirect('/products/productList');
//     },

//Función para listar los productos
    // list: (req, res) => {
    //     const products = productsModel.all();
    //     res.render('products/productList', { products });
    //  },

    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const productNameKeyword = query.product_name ? query.product_name: '';
        let products = await Product.findAll({
            where: { name: { [Op.substring]: productNameKeyword }} 
        });
        return res.render('products/productList', { products });
    } else {
        let products = await Product.findAll();        
        return res.render('products/productList', { products });
    }},

// // Función para traer datos los productos para editar
//     edit: (req, res) => {
//         let product = productsModel.find(req.params.id);
//         if (product) {
//             res.render('products/editProducts', { product });
//         } else {
//             res.render('error404');
//         }
//     },
        
// // Función para actualizar información editada de los producto
//     update: (req, res) => {
//         let  product = req.body;
//         product.id = req.params.id;
//         product.image = req.file ? req.file.filename : req.body.old_image;
//         if (req.body.image===undefined) {
//             product.image = req.body.old_image
//         }
//         delete product.oldImage;
//         productsModel.update(product);
//         res.redirect("/products/productDetail/" + req.params.id);
//     }, 

// // Función para guardar y mostrar el carrito de compras
//     cart: (req, res) => {
//         res.render('products/productCart');
//     }
};


module.exports = productsController;