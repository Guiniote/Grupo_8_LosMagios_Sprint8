const express = require('express');
const router = express.Router();
const coursesController = require('../controller/coursesController');

// Middlewares
const {uploadCourse} = require('../middlewares/multerMiddleware');
//const {validateEditProduct} = require('../middlewares/validationsMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

// Carrito
//router.get('/productCart', servicesController.cart);
//router.post('/productCart', servicesController.cart);

// Lista de servicios
router.get('/courseList', coursesController.list);

// Detalle de servicios
router.get('/courseDetail/:id', coursesController.show);

// Creación de servicios
router.get('/createCourses', userLoggedMiddleware, coursesController.create);
router.post('/store', uploadCourse.single('image'), coursesController.store);

// Edición de servicios
router.get('/editCourses/:id', userLoggedMiddleware, coursesController.edit);
router.post ('/editCourses/:id', uploadCourse.single('image'), /*validateEditProduct,*/ coursesController.update);
router.get('/:id', coursesController.show);
router.delete('/courseDetail/:id', coursesController.destroy);



module.exports = router;