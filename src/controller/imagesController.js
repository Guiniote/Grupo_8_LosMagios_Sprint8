const { Image } = require('../database/models');


const imagesController = {

// Función que simula el almacenamiento
    store: (req, res) => {
        const image = req.body;
        image.image = req.file ? req.file.filename : '';
        Image.create(image)
        .then(result => { 
        res.redirect('/images/imageList');
        })
        .catch(error => res.send(error));

    },

// Función que borra información almacenada
    destroy: async (req, res) => {
        await Image.destroy({ where: {id: req.params.id}});        
        res.redirect('/images/imageList');
    },

// Función para actualizar información editada de los servicio
    update: (req, res) => {
        let image = req.body;
        image.id = req.params.id;
        image.image = req.file ? req.file.filename : req.body.old_image;
        if (req.body.image===undefined) {
            image.image = req.body.old_image
        }
        delete image.oldImage;
        Image.update(image, {
            where: {id: req.params.id}
        })
        .then(result => {
        res.redirect("/images/imageDetail/" + req.params.id);
        })
        .catch(error => res.send(error));
        
    }, 

// Función para crear en masa
    bulkCreate: async (id, images) => {

        // Agrego a cada uno de los comentarios el ID de tutorial.
        images.forEach(image => image.productId = id);
    
        // Rafaga de Creates.
        return await Image.bulkCreate(images);
    },
};


module.exports = imagesController;