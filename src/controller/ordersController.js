const { Order } = require('../database/models');
const { Op } = require("sequelize");


const orderController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('order/createOrders');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const order = req.body;
        order.image = req.file ? req.file.filename : '';
        Order.create(order)
        .then(result => { 
        res.redirect('/orders/orderList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let order = await Order.findByPk(req.params.id);
        if (order) {
            res.render('orders/orderDetail', { order });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Order.destroy({ where: {id: req.params.id}});        
        res.redirect('/orders/orderList');
    },

//Función para listar los servicios
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const orderNameKeyword = query.order_name ? query.order_name: '';
        let orders = await Order.findAll({
            where: { name: { [Op.substring]: orderNameKeyword }} 
        });
        return res.render('orders/orderList', { orders });
    } else {
        let orders = await Order.findAll();        
        return res.render('orders/orderList', { orders });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let order = await Order.findByPk(req.params.id);
        if (order) {
            res.render('orders/editorders', { order });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let order = req.body;
        order.id = req.params.id;
        order.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            order.image = req.body.old_image
        }
        delete order.oldImage;
        Order.update(order, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/orders/orderDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = orderController;