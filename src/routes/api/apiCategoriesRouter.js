const express = require('express');
const router = express.Router();
const apiCategoriesController = require('../../controller/api/apiCategoriesController');

//Rutas
//Listado de marcas
router.get('/', apiCategoriesController.list);
//Cantidad de marcas
router.get('/count', apiCategoriesController.count);
//Detalle de una marca
router.get('/:id', apiCategoriesController.detail);

module.exports = router;
