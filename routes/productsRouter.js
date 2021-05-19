const express = require('express');
const router = express.Router();
const controladorProducts = require('../controller/productsController');
const authMiddleware = require('../middlewares/authMiddleware');

//Declaracion de constantes para funcionamiento de multer 
const multer = require('multer');
const path = require('path');

//Agregando multer
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });



router.get('/productCart', controladorProducts.cart);

router.post('/productCart', controladorProducts.cart);

router.get('/productList', controladorProducts.list);

router.get('/productDetail/:id', controladorProducts.show);

router.get('/createProducts', authMiddleware, controladorProducts.create);

router.post('/store', upload.single('image'), controladorProducts.store);

router.get('/editProducts/:id', authMiddleware, controladorProducts.edit);

router.put ('/editProducts/:id', controladorProducts.update);

router.get('/:id', controladorProducts.show)

router.delete('/productDetail/:id', controladorProducts.destroy);



module.exports = router;