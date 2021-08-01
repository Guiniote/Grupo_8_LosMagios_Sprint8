const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controller/api/apiProductsController');


router.get('/', apiProductsController.list);
router.get('/:id', apiProductsController.listById);



module.exports = router;