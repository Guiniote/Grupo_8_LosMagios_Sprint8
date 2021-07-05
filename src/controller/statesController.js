const { State } = require('../database/models');
const { Op } = require("sequelize");


const statesController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('states/createStates');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const state = req.body;
        state.image = req.file ? req.file.filename : '';
        State.create(state)
        .then(result => { 
        res.redirect('/states/stateList');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let state = await State.findByPk(req.params.id);
        if (state) {
            res.render('states/stateDetail', { state});
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await State.destroy({ where: {id: req.params.id}});        
        res.redirect('/states/stateList');
    },

//Función para listar los servicios
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const stateNameKeyword = query.state_name ? query.state_name: '';
        let states = await State.findAll({
            where: { name: { [Op.substring]: stateNameKeyword }} 
        });
        return res.render('states/stateList', { states });
    } else {
        let states = await State.findAll();        
        return res.render('states/stateList', { states });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let state = await State.findByPk(req.params.id);
        if (state) {
            res.render('states/editState', { state });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let state = req.body;
        state.id = req.params.id;
        state.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            state.image = req.body.old_image
        }
        delete state.oldImage;
        State.update(state, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/states/stateDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = statesController;