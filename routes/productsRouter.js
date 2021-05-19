const express = require('express');
const router = express.Router();
const controladorProducts = require('../controller/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

//Declaracion de constantes para funcionamiento de multer 
const multer = require('multer');
const path = require('path');


//Agregando multer aunque todavia no se use
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/productCart', (req, res) => {
    res.render('products/productCart');
});

 router.post('/productCart', (req, res) => {
    res.render('products/productCart');
 });

router.get('/productList', controladorProducts.list);

router.get('/productDetail/:id', controladorProducts.show);


//Actulizacion de la ruta para crear productos. Ahora pasa por el controller
router.get('/createProducts', authMiddleware, (req, res) => {
    res.render('products/createProducts');
});


//Accion para el boton "Enviar Datos" del createProducts
router.post('/store', upload.single('image'), controladorProducts.store);


router.get('/editProducts/:id', authMiddleware, controladorProducts.edit);
// Detalle de un producto particular (GET)
router.put ('/editProducts/:id', controladorProducts.update);


router.get('/:id', controladorProducts.show)

// Acción de borrado (DELETE)
router.delete('/productDetail/:id', controladorProducts.destroy);










module.exports = router;