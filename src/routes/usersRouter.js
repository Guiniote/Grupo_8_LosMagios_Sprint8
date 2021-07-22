const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// Middlewares
const {uploadAvatar} = require('../middlewares/multerMiddleware');
const {validateUserRegister} = require('../middlewares/validationsMiddleware');
const {validateUserLogin} = require('../middlewares/validationsMiddleware');
const {validateUserEdit} = require('../middlewares/validationsMiddleware');
const userGuestMiddleware = require('../middlewares/userGuestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');


router.get('/login', userGuestMiddleware, usersController.login);
router.post('/login', validateUserLogin, usersController.loginProcess);
router.get('/register', userGuestMiddleware, usersController.add);
router.post('/register', uploadAvatar.single('avatar'), validateUserRegister, usersController.create);
router.get('/profile', userLoggedMiddleware, usersController.profile);
router.get('/edit/:id', userLoggedMiddleware, usersController.edit);
router.put('/edit/:id', uploadAvatar.single('avatar'), /*validateUserEdit,*/ usersController.update);
router.get('/logout', usersController.logout);


module.exports = router;