const { OrderDetail } = require('../database/models');
const { Op } = require("sequelize");


const orderDetailController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('orderDetail/createorderDetail');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const orderDetail = req.body;
        orderDetail.image = req.file ? req.file.filename : '';
        OrderDetail.create(orderDetail)
        .then(result => { 
        res.redirect('/orderDetail/orderDetailList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let orderDetail = await OrderDetail.findByPk(req.params.id);
        if (orderDetail) {
            res.render('orderDetail/orderDetailDetail', { orderDetail });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await OrderDetail.destroy({ where: {id: req.params.id}});        
        res.redirect('/orderDetail/orderDetailList');
    },

//Función para listar los servicios
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const orderDetailNameKeyword = query.orderDetail_name ? query.orderDetail_name: '';
        let orderDetails = await OrderDetail.findAll({
            where: { name: { [Op.substring]: orderDetailNameKeyword }} 
        });
        return res.render('orderDetail/orderDetailList', { orderDetails });
    } else {
        let orderDetails = await OrderDetail.findAll();        
        return res.render('orderDetail/orderDetailList', { orderDetails });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let orderDetail = await OrderDetail.findByPk(req.params.id);
        if (orderDetail) {
            res.render('orderDetail/editorderDetail', { orderDetail });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let orderDetail = req.body;
        orderDetail.id = req.params.id;
        orderDetail.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            orderDetail.image = req.body.old_image
        }
        delete orderDetail.oldImage;
        OrderDetail.update(orderDetail, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/orderDetail/orderDetailDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = orderDetailController;