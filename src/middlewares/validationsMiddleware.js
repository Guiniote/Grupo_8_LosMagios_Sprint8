const path = require('path');
const { body } = require('express-validator');


const validateLogin = [
    body('email')
        .notEmpty().withMessage('Recordá ingresar un email').bail()
        .isEmail().withMessage('El formato del mail no es válido'),
	body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
];

const validateRegister = [
	body('firstName').notEmpty().withMessage('Recordá ingresar un nombre'),
    body('lastName').notEmpty().withMessage('Recordá ingresar un un apellido'),
	body('email').notEmpty().withMessage('Recordá ingresar un email').bail().isEmail().withMessage('El formato del mail no es válido'),
	body('password').notEmpty().withMessage('Recordá ingresar una contraseña'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

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
	