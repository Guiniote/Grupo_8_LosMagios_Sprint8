const { Product, Brand, Category } = require('../database/models');
const { Op } = require("sequelize");



const productsController = {

// Función que muestra el formulario de crear Productos
    create: async (req, res) => {        
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        res.render('products/createProducts', { brands, categories });
    },
    
// Función que simula el almacenamiento, en este caso en array
    store: async (req, res) => {
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
            
        //     Switch (expresión) { case valor1: CODIGO; break; case valor2: case valor3: CODIGO; break; default: CODIGO; break; }


        //     let images = [];
        // let imageName = '';
        // for (let i = 0; i < 5; i++) {
        //         switch(i) {
        //             case 0: 
        //         }

        //     if (i==0) nameImage = req.files.foto[0] ? req.files.foto[0].filename : 'logo-casa-alquiler.jpg';
        //     if (i==1) nameImage = req.files.foto2[0] ? req.files.foto2[0].filename : 'logo-casa-alquiler.jpg';
        //     if (i==2) nameImage = req.files.foto3[0] ? req.files.foto3[0].filename : 'logo-casa-alquiler.jpg';
        //     imagesFiles.push({
                
        //         image_name: nameImage
        //     })
        // }

        
        // let images = imageController.bulkCreate(newProperty.id, imagesFiles);

            res.redirect('/products/productList');

        } catch (error) {
            res.send(error)
        }
    }, 

        /*Ver si esto anda:
        let imagesCreated = await Image.create (
                {
                name: req.file.filename,
                productId: productCreated.id
                
            })
        */

        

// // Función que muestra la información almacenada
    show: async (req, res) => {        
        let product = await Product.findByPk(req.params.id, {
            include: ['brand'], });            
        if (product) {            
            res.render('products/productDetail', { product });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Product.destroy({ where: {id: req.params.id}});        
        res.redirect('/products/productList');
    },

//Función para listar los productos
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

// Función para traer datos los productos para editar
    edit: async (req, res) => {
        let brands = await Brand.findAll();
        let categories = await Category.findAll();
        let product = await Product.findByPk(req.params.id, {
            include: ['brand', 'category'], });
        if (product) {
            res.render('products/editProducts', { product, brands, categories });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los producto
    update: (req, res) => {
        let product = req.body;
        product.id = req.params.id;
        //product.image = req.file ? req.file.filename : req.body.old_image;
        // if (req.body.image===undefined) {
        //     product.image = req.body.old_image
        // }
        // delete product.oldImage;
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
            })
            
            res.redirect("/products/productDetail/" + req.params.id);
        
        } catch (error) {
            res.send(error)
        }
        
    }, 



// // Función para guardar y mostrar el carrito de compras
//     cart: (req, res) => {
//         res.render('products/productCart');
//     }
};


module.exports = productsController;