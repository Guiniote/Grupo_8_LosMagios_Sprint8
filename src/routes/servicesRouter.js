const express = require('express');
const router = express.Router();
const servicesController = require('../controller/servicesController');
const {validateServices} = require('../middlewares/validationsMiddleware');

// Middlewares
const {uploadService} = require('../middlewares/multerMiddleware');
//const {validateEditProduct} = require('../middlewares/validationsMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

// Carrito
//router.get('/productCart', servicesController.cart);
//router.post('/productCart', servicesController.cart);

// Lista de servicios
router.get('/serviceList', servicesController.list);

// Detalle de servicios
router.get('/serviceDetail/:id', servicesController.show);

// Creación de servicios
router.get('/createServices', userLoggedMiddleware, servicesController.create);
router.post('/store', uploadService.single('image'),validateServices, servicesController.store);

// Edición de servicios
router.get('/editServices/:id', userLoggedMiddleware, servicesController.edit);
router.post ('/editServices/:id', uploadService.single('image'), /*validateEditProduct,*/ servicesController.update);
router.get('/:id', servicesController.show);
router.delete('/serviceDetail/:id', servicesController.destroy);



module.exports = router;