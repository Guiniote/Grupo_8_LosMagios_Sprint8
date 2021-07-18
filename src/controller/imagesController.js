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
    update: async (productId, images) => {                    
        let storedImages = await Image.findAll({
            where: { productId: productId }});
        
        for (let i = 0; i < 5; i++) {
            if (storedImages[i] != undefined && images[i] != '') {
                if (storedImages[i].name !== images[i].name) {
                    await Image.update({ name: images[i].name }, {where: { productId: productId, id: storedImages[i].id }});
                }
            } else if (storedImages[i] != undefined && images[i] == '') {
                await Image.destroy({where: { productId: productId, id: storedImages[i].id }});
            } else if (storedImages[i] == undefined && images[i] != '') {
                let imageNew = {};
                imageNew.name = images[i].name;
                imageNew.productId = productId;
                await Image.create(imageNew);
            }
        }
        
        return
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