const express = require('express');
const router = express.Router();
const apiCategoriesController = require('../../controller/api/apiCategoriesController');

router.get('/', apiCategoriesController.list);
router.get('/count', apiCategoriesController.count);
router.get('/:id', apiCategoriesController.detail);

module.exports = router;
