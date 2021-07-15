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

        console.log("id: " + productId);
        console.log(images);
            
        let storedImages = await Image.findAll({
            where: { productId: productId }});
        
        console.log(images[0].name);
        console.log(storedImages[0].name);
        console.log(storedImages[0].id);
        console.log(storedImages[3]);

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

        // if (storedImages[0] != undefined && images[0] != '') {
        //     if (storedImages[0].name !== images[0].name) {
        //         await Image.update({ name: images[0].name }, {where: { productId: productId, id: storedImages[0].id }});
        //     }
        // } else if (storedImages[0] != undefined && images[0] == '') {
        //     await Image.destroy({where: { productId: productId, id: storedImages[0].id }});
        // } else if (storedImages[0] == undefined && images[0] != '') {
        //     let imageNew = {};
        //     imageNew.name = images[0].name;
        //     imageNew.productId = productId;
        //     await Image.create(imageNew);
        // }

        // images.forEach(image => image.productId = id);
        
        // return await Image.update(images, {where: { productId: id }});

        // let image = req.body;
        // image.id = req.params.id;
        // image.image = req.file ? req.file.filename : req.body.old_image;
        // if (req.body.image===undefined) {
        //     image.image = req.body.old_image
        // }
        // delete image.oldImage;
        // Image.update(image, {
        //     where: {id: req.params.id}
        // })
        // .then(result => {
        // res.redirect("/images/imageDetail/" + req.params.id);
        // })
        // .catch(error => res.send(error));
        
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