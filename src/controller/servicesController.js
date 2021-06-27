const { Service } = require('../database/models');
const { Op } = require("sequelize");


const servicesController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('services/createServices');
    },

// Función que simula el almacenamiento, en este caso en array
    store: (req, res) => {
        const service = req.body;
        service.image = req.file ? req.file.filename : '';
        Service.create(service)
        .then(result => { 
        res.redirect('/services/serviceList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let service = await Service.findByPk(req.params.id);
        if (service) {
            res.render('services/serviceDetail', { service });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Service.destroy({ where: {id: req.params.id}});        
        res.redirect('/services/serviceList');
    },

//Función para listar los servicios
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const serviceNameKeyword = query.service_name ? query.service_name: '';
        let services = await Service.findAll({
            where: { name: { [Op.substring]: serviceNameKeyword }} 
        });
        return res.render('services/serviceList', { services });
    } else {
        let services = await Service.findAll();        
        return res.render('services/serviceList', { services });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let service = await Service.findByPk(req.params.id);
        if (service) {
            res.render('services/editServices', { service });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let service = req.body;
        service.id = req.params.id;
        service.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            service.image = req.body.old_image
        }
        delete service.oldImage;
        Service.update(service, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/services/serviceDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = servicesController;