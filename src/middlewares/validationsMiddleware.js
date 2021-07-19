const path = require('path');
const { body } = require('express-validator');
const usersController = require('../controller/usersController');
const bcryptjs = require('bcryptjs');
const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const passwordChars = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;


const validateUserLogin = [
    body('email')
		.notEmpty().withMessage('Recordá ingresar un email').bail()
		.isEmail().withMessage('El formato del email no es válido'),		
	body('password')
		.notEmpty().withMessage('Recordá ingresar una contraseña'),
	body('submit')
		.custom((email, {req}) => {
			return usersController.findUserByEmail(req.body.email)
				.then(user => {
					if (!user&&req.body.email&&req.body.password) {
						return Promise.reject('Las credenciales son inválidas');
					}
				});
		})
		.custom((password, {req}) => {
			return usersController.findUserByEmail(req.body.email)
				.then(user => {					
					if(user) {
						let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
						if (!isOkThePassword) {
							return Promise.reject('Las credenciales son inválidas');
						}
					}
				});
		}),
];

const validateUserRegister = [	
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
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
	body('confirmPassword')
		.notEmpty().withMessage('Recordá ingresar una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial').bail()
		.custom((confirmPassword, {req}) => {
			const password = req.body.password;			
			if(password !== confirmPassword) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
		}),
	body('avatar')
		.custom((value, { req }) => {
			let file = req.file;
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

const validateUserEdit = [
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
		.custom((email, { req }) => {
			return usersController.findUserByEmail(email)
				.then(user => {					
					if (user&&user.id!=req.params.id) {
						return Promise.reject('Este email ya está en uso');
					}
				});
		}),
	body('avatar')		
		.custom( (value, { req }) => {
			let file = req.file;			
			return usersController.findUserById(req.params.id)
				.then (user => {										
					if (!file&&user.avatar=='') {
						throw new Error('El campo de imagen es obligatorio');
					} else if (file) {
						let fileExtension = path.extname(file.originalname);
						if (!acceptedExtensions.includes(fileExtension)) {
							throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
						}
					}
				return true;
				})
		}),
	body('address')
		.notEmpty().withMessage('Recordá ingresar una dirección').bail()
		.isLength({ min: 3 }).withMessage('La dirección debe tener al menos 3 caracteres'),	
	body('zipCode')
		.notEmpty().withMessage('Recordá ingresar el código postal').bail()
		.isLength({ min: 4 }).withMessage('El código postal debe tener al menos 4 caracteres'),
	body('city')
		.notEmpty().withMessage('Recordá ingresar una ciudad').bail()
		.isLength({ min: 3 }).withMessage('La dirección debe tener al menos 3 caracteres'),
	body('telephone')
		.notEmpty().withMessage('Recordá ingresar un teléfono').bail()
		.isLength({ min: 5 }).withMessage('El teléfono debe tener al menos 5 caracteres'),
	body('passwordOld')
		.custom((password, {req}) => {
			if (password) {
				return usersController.findUserByEmail(req.body.email)
					.then(user => {					
						if(user) {
							let isOkThePassword = bcryptjs.compareSync(req.body.passwordOld, user.password);
							if (!isOkThePassword) {
								return Promise.reject('La contraseña ingresada es incorrecta');
							}
						}
					});
			} else {
				return true;
			}
		}),
	body('passwordNew')
		.optional({ checkFalsy: true })		
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
	body('confirmPassword')		
		.optional({ checkFalsy: true })
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial').bail()
		.custom((confirmPassword, {req}) => {
			const password = req.body.passwordNew;			
			if(!password === confirmPassword) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
		}),
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



module.exports = { validateUserRegister, validateEditProduct, validateUserLogin, validateUserEdit }
	