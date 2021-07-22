const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController');

// Middlewares
const {uploadProduct} = require('../middlewares/multerMiddleware');
const {validateRegProduct} = require('../middlewares/validationsMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

// Carrito
// router.get('/productCart', productsController.cart);
// router.post('/productCart', productsController.cart);

// Lista de productos
router.get('/productList', productsController.list);

// Detalle de productos
router.get('/productDetail/:id', productsController.show);

// Creación de productos
router.get('/createProducts', /*userLoggedMiddleware,*/ productsController.create);
router.post('/store', uploadProduct.fields([{name: 'image1'}, {name: 'image2'}, {name: 'image3'}, {name: 'image4'}, {name: 'image5'}]), validateRegProduct, productsController.store);

// Edición de productos
router.get('/editProducts/:id', userLoggedMiddleware, productsController.edit);
router.post ('/editProducts/:id', uploadProduct.fields([{name: 'image1'}, {name: 'image2'}, {name: 'image3'}, {name: 'image4'}, {name: 'image5'}]), /*validateEditProduct,*/ productsController.update);
router.get('/:id', productsController.show);
router.delete('/productDetail/:id', productsController.destroy);



module.exports = router;