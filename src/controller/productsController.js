const { Product, Brand, Category, Image } = require('../database/models');
const { Op } = require("sequelize");
const imagesController = require('./imagesController');
const { validationResult } = require('express-validator');



const productsController = {

// Función que muestra el formulario de crear Productos
    create: async (req, res) => {        
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        res.render('products/createProducts', { brands, categories });
    },
    

// Función que simula el almacenamiento, en este caso en array
    store: async (req, res) => {
        let errors = validationResult(req); 
        let categories = await Category.findAll();
        let brands = await Brand.findAll();       
        if (errors.isEmpty()) {
        try{
            let productCreated = await Product.create({
                name: req.body.name,
                model: req.body.model,
                description: req.body.description,
                specs: req.body.specs,
                keywords: req.body.keywords,
                price: req.body.price,
                discount: req.body.discount,
                stock: req.body.stock,
                stockMin: req.body.stockMin,
                stockMax: req.body.stockMax,
                categoryId: req.body.category,
                brandId: req.body.brand
            });

            let imagesForProduct = [];                                

            req.body.image1 = req.files['image1'] ? req.files['image1'][0].filename : '';
            req.body.image1 != '' ? imagesForProduct.push({ name: req.body.image1 }) : '';
            req.body.image2 = req.files['image2'] ? req.files['image2'][0].filename : '';
            req.body.image2 != '' ? imagesForProduct.push({ name: req.body.image2 }) : '';
            req.body.image3 = req.files['image3'] ? req.files['image3'][0].filename : '';
            req.body.image3 != '' ? imagesForProduct.push({ name: req.body.image3 }) : '';
            req.body.image4 = req.files['image4'] ? req.files['image4'][0].filename : '';
            req.body.image4 != '' ? imagesForProduct.push({ name: req.body.image4 }) : '';
            req.body.image5 = req.files['image5'] ? req.files['image5'][0].filename : '';
            req.body.image5 != '' ? imagesForProduct.push({ name: req.body.image5 }) : '';
            
            await imagesController.bulkCreate(productCreated.id, imagesForProduct)

            res.redirect('/products/productList');

        } catch (error) {
            res.send(error)
        }
        } else {
            res.render('products/createProducts', {
                categories,
                brands,
                errors: errors.mapped(),
                oldData: req.body
            })
    }
},


// Función que muestra la información almacenada
    show: async (req, res) => {        
        let product = await Product.findByPk(req.params.id, {
            include: ['brand', 'images'], });            
        if (product) {            
            res.render('products/productDetail', { product });
        } else {
            res.render('error404');
        }
    },


// Función que borra información almacenada
    destroy: async (req, res) => {        
        await Image.destroy({             
            where: {productId: req.params.id}});  
        await Product.destroy({             
            where: {id: req.params.id}});        
        res.redirect('/products/productList');        
    },


//Función para listar los productos
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const productNameKeyword = query.product_name ? query.product_name: '';
        let products = await Product.findAll({ 
            include: ['images']}, {
            where: { name: { [Op.substring]: productNameKeyword }} 
        });        
        return res.render('products/productList', { products });
    } else {
        let products = await Product.findAll({ 
            include: ['images'] 
        });        
        return res.render('products/productList', { products });
    }},


// Función para traer datos los productos para editar
    edit: async (req, res) => {
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        let product = await Product.findByPk(req.params.id, {
            include: ['brand', 'category', 'images'], });
        if (product) {
            res.render('products/editProducts', { product, brands, categories });
        } else {
            res.render('error404');
        }
    },

        
// Función para actualizar información editada de los producto
    update: async (req, res) => {  
        let errors = validationResult(req);      
        let product = req.body;
        let imagesOnProduct = [];
        product.id = req.params.id;
        
        if (req.body.old_image0) {
            product.image1 = req.body.old_image0;
        } else if (req.files['image1']) {
            product.image1 = req.files['image1'][0].filename;
        } else {
            product.image1 = ''
        }
        imagesOnProduct.push({ name: product.image1 });
        
        if (req.body.old_image1) {
            product.image2 = req.body.old_image1;
        } else if (req.files['image2']) {
            product.image2 = req.files['image2'][0].filename;
        } else {
            product.image2 = ''
        }
        imagesOnProduct.push({ name: product.image2 });

        if (req.body.old_image2) {
            product.image3 = req.body.old_image2;
        } else if (req.files['image3']) {
            product.image3 = req.files['image3'][0].filename;
        } else {
            product.image3 = ''
        }
        imagesOnProduct.push({ name: product.image3 });
        
        if (req.body.old_image3) {
            product.image4 = req.body.old_image3;
        } else if (req.files['image4']) {
            product.image4 = req.files['image4'][0].filename;
        } else {
            product.image4 = ''
        }
        imagesOnProduct.push({ name: product.image4 });
        
        if (req.body.old_image4) {
            product.image5 = req.body.old_image4;
        } else if (req.files['image5']) {
            product.image5 = req.files['image5'][0].filename;
        } else {
            product.image5 = ''
        }
        imagesOnProduct.push({ name: product.image5 });

        if (errors.isEmpty()) { 
        try {    
            Product.update({
                id: req.params.id,
                name: req.body.name,
                model: req.body.model,
                description: req.body.description,
                specs: req.body.specs,
                keywords: req.body.keywords,
                price: req.body.price,
                discount: req.body.discount,
                stock: req.body.stock,
                stockMin: req.body.stockMin,
                stockMax: req.body.stockMax,
                categoryId: req.body.category,
                brandId: req.body.brand
            }, {
                where: {id: req.params.id}
            });
                        
            imagesController.update(product.id, imagesOnProduct);
            
            res.redirect("/products/productDetail/" + req.params.id);
            
        
        } catch (error) {
            res.send(error)
        }  }
        else {
            res.render('products/editProducts', {
                categories,
                brands,
                errors: errors.mapped(),
                oldData: req.body
            })
    }
    }, 

};


module.exports = productsController;