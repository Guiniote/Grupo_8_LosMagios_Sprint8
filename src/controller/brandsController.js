const { Brand } = require('../database/models');
const { Op } = require("sequelize");


const brandsController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('brands/createBrands');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const brand = req.body;
        //brand.image = req.file ? req.file.filename : '';
        Brand.create(brand)
        .then(result => { 
        res.redirect('/brand/brandList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let brand = await Brand.findByPk(req.params.id);
        if (brand) {
            res.render('brand/brandDetail', { brand });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Brand.destroy({ where: {id: req.params.id}});        
        res.redirect('/brand/brandList');
    },

//Función para listar los marcas
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const brandNameKeyword = query.brand_name ? query.brand_name: '';
        let brands = await Brand.findAll({
            where: { name: { [Op.substring]: brandNameKeyword }} 
        });
        return res.render('brand/brandList', { brands });
    } else {
        let brands = await Brand.findAll();        
        return res.render('brand/brandList', { brands });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let brand = await Brand.findByPk(req.params.id);
        if (brand) {
            res.render('brands/editBrands', { brand });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let brand = req.body;
        brand.id = req.params.id;
        brand.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            brand.image = req.body.old_image
        }
        delete brand.oldImage;
        Brand.update(brand, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/brands/brandDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = brandsController;