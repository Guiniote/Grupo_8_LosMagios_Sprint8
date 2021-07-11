const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');

// Middlewares
const {uploadAvatar} = require('../middlewares/multerMiddleware');
const {validateRegister, validateLogin} = require('../middlewares/validationsMiddleware');
const userGuestMiddleware = require('../middlewares/userGuestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');


router.get('/login', userGuestMiddleware, userController.login);
router.post('/login', validateLogin, userController.loginProcess); 
router.get('/profile', userLoggedMiddleware, userController.profile);
router.delete('/delete/:id', userController.destroy);
router.get('/register', userGuestMiddleware, userController.register); 
router.post('/register', uploadAvatar.single('avatar'), validateRegister, userController.registerProcess);
router.get('/logout/', userController.logout);

/* OLDIE BUT GOLDIE
// Formulario de registro
router.get('/register', userGuestMiddleware, usersController.register);
router.post('/register', uploadAvatar.single('avatar'), validateRegister, usersController.processRegister);

router.get('/editprofile', usersController.edit);
router.post('/editprofile');

// Formulario de login
router.get('/login', userGuestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/logout', usersController.logout);

// Página de perfil
router.get('/profile', userLoggedMiddleware, usersController.profile);
*/




module.exports = router;