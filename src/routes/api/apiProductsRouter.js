const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controller/api/apiProductsController');


router.get('/', apiProductsController.list);
//router.get('/products/:id', apiProductsController.show);



module.exports = router;