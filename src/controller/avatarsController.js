const { Avatar } = require('../database/models');
const { Op } = require("sequelize");


const avatarsController = {

// Función que muestra el formulario de crear servicios
    create: (req, res) => {
        res.render('avatars/createAvatars');
    },

// Función que simula el almacenamiento
    store: (req, res) => {
        const avatar = req.body;
        avatar.image = req.file ? req.file.filename : '';
        Avatar.create(avatar)
        .then(result => { 
        res.redirect('/');
        })
        .catch(error => res.send(error));

    },

// Función que muestra la información almacenada
    show: async (req, res) => {
        let avatar = await Avatar.findByPk(req.params.id);
        if (avatar) {
            res.render('avatar/avatarDetail', { avatar });
        } else {
            res.render('error404');
        }
    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Avatar.destroy({ where: {id: req.params.id}});        
        res.redirect('/avatar/avatarlist');
    },

//Función para listar los avatars
    list: async (req, res) => {        
        if (req.query) {            
        const query = req.query;            
        const avatarNameKeyword = query.avatar_name ? query.avatar_name: '';
        let avatar = await Avatar.findAll({
            where: { name: { [Op.substring]: avatarNameKeyword }} 
        });
        return res.render('avatar/avatarList', { avatar });
    } else {
        let avatar = await Avatar.findAll();        
        return res.render('avatar/avatarList', { avatar });
    }},
        
     
// Función para traer datos los servicios para editar
    edit: async (req, res) => {
        let avatar = await Avatar.findByPk(req.params.id);
        if (avatar) {
            res.render('avatar/editAvatar', { avatar });
        } else {
            res.render('error404');
        }
    },
        
// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let avatar = req.body;
        avatar.id = req.params.id;
        avatar.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            avatar.image = req.body.old_image
        }
        delete avatar.oldImage;
        Avatar.update(avatar, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/avatar/avatarDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para guardar y mostrar el carrito de compras
   /* cart: (req, res) => {
        res.render('services/serviceCart');
    }*/
};


module.exports = avatarsController;