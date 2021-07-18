const path = require('path');
const { body } = require('express-validator');
const usersController = require('../controller/usersController');


const validateLogin = [
    body('email')
        .notEmpty().withMessage('Recordá ingresar un email').bail()
        .isEmail().withMessage('El formato del mail no es válido'),
	body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
];

const validateRegister = [	
	body('firstName')
		.notEmpty().withMessage('Recordá ingresar un nombre').bail()
		.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('surname')
		.notEmpty().withMessage('Recordá ingresar un apellido').bail()
		.isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
	body('userName')
		.notEmpty().withMessage('Recordá ingresar un nombre de usuario').bail()
		.isLength({ min: 2 }).withMessage('El nombre de usuario debe tener al menos 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Recordá ingresar un email').bail()
		.isEmail().withMessage('El formato del email no es válido').bail()
		.custom(email => {
			return usersController.findUserByEmail(email)
				.then(user => {
					if (user) {
						return Promise.reject('Este email ya está en uso');
					}
				});
		}),
	body('password')
		.notEmpty().withMessage('Recordá ingresar una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
	body('confirmPassword')
		.notEmpty().withMessage('Recordá ingresar una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial').bail()
		.custom((confirmPassword, {req}) => {
			const password = req.body.password;			
			if(password !== confirmPassword) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
		}),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
		if (!file) {
			throw new Error('El campo de imagen es obligatorio');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
];

const validateEditProduct = [
	body('name').notEmpty().withMessage('El nombre del prducto no puede estar vacio'),
    body('description').notEmpty().withMessage('La descripccion del prducto no puede estar vacia'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}

		return true;
	}),
	body('category').notEmpty().withMessage('Debes indicar una categoria'),
	body('colors').notEmpty().withMessage('No asignaste un color'),
	body('price').notEmpty().withMessage('Debes indicar el precio del producto')
]



module.exports = {validateRegister, validateEditProduct, validateLogin}
	