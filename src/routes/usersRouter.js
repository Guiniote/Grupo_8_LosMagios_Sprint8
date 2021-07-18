const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// Middlewares
const {uploadAvatar} = require('../middlewares/multerMiddleware');
const {validateRegister} = require('../middlewares/validationsMiddleware');
const userGuestMiddleware = require('../middlewares/userGuestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');


router.get('/login', userGuestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/register', userGuestMiddleware, usersController.add);
router.post('/register', uploadAvatar.single('avatar'), validateRegister, usersController.create);
router.get('/profile', userLoggedMiddleware, usersController.profile);
router.get('/edit', usersController.edit);
router.put('/profile/update/:id', uploadAvatar.single('avatar'), usersController.update);
router.get('/logout', usersController.logout);


module.exports = router;