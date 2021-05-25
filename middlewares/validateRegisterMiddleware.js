const path = require('path');
const { body } = require('express-validator');

const validations = [
	body('firstName').notEmpty().withMessage('Recordá ingresar un nombre'),
    body('lastName').notEmpty().withMessage('Recordá ingresar un un apellido'),
	body('email').notEmpty().withMessage('Recordá ingresar un email').bail().isEmail().withMessage('El email tiene que tener un formato válido'),
	body('password').notEmpty().withMessage('Recordá ingresar una contraseña')
    //Reservado para subir imagen de perfil
	//body('country').notEmpty().withMessage('Tienes que elegir un país'),
	/*body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})*/
]

module.exports = validations
	