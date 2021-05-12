const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controller/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');






// Formulario de registro
router.get('/register', guestMiddleware, controller.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, controller.processRegister);

//Reservado para login

/*
router.get('/register', (req, res) => {
    res.render('users/register');
});
*/
router.get('/login', (req, res) => {
    res.render('users/login');
});



module.exports = router;