const { Category } = require('../database/models');
const { Op } = require("sequelize");


const categoriesController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('categories/createCategories');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const category = req.body;
        category.image = req.file ? req.file.filename : '';
        Category.create(category)
        .then(result => { 
        res.redirect('/categories/categoryList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let category = await Category.findByPk(req.params.id);
        if (category) {
            res.render('categories/categoryDetail', { service });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Category.destroy({ where: {id: req.params.id}});        
        res.redirect('/categories/categoryList');
    },

//Función para listar los servicios
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const categoryNameKeyword = query.category_name ? query.category_name: '';
        let categories = await Category.findAll({
            where: { name: { [Op.substring]: categoryNameKeyword }} 
        });
        return res.render('category/categoryList', { categories });
    } else {
        let categories = await Category.findAll();        
        return res.render('categories/categoryList', { categories });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let category = await Category.findByPk(req.params.id);
        if (category) {
            res.render('category/editCategories', { category });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let category = req.body;
        category.id = req.params.id;
        category.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            category.image = req.body.old_image
        }
        delete category.oldImage;
        Category.update(category, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/categories/categoryDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = categoriesController;