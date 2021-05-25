const jsonDB = require('../model/productsModel');
const productsModel = jsonDB('products');


const productsController = {

// Función que muestra el formulario de crear Productos
    create: (req, res) => {
        res.render('products/createProducts');
    },

// Función que simula el almacenamiento, en este caso en array
    store: (req, res) => {
        const product = req.body;
        product.image = req.file ? req.file.filename : '';
        productsModel.create(product);
        res.redirect('/products/productList');
    },

// Función que muestra la información almacenada
    show: (req, res) => {
        const product = productsModel.find(req.params.id);
        if (product) {
            res.render('products/productDetail', { product });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: (req, res) => {
        productsModel.delete(req.params.id);
        res.redirect('/products/productList');
    },

//Función para listar los productos
    list: (req, res) => {
        const products = productsModel.all();
        res.render('products/productList', { products });
    },

// Función para traer datos los productos para editar
    edit: (req, res) => {
        let product = productsModel.find(req.params.id);
        if (product) {
            res.render('products/editProducts', { product });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los producto
    update: (req, res) => {
        let  product = req.body;
        product.id = req.params.id;
        product.image = req.file ? req.file.filename : req.body.oldImagen;
        if (req.body.image===undefined) {
            product.image = product.oldImage
        }
        delete product.oldImage;
        productsModel.update(product);
        res.redirect('/products/productList');
    }, 

// Función para guardar y mostrar el carrito de compras
    cart: (req, res) => {
        res.render('products/productCart');
    }
}


module.exports = productsController;