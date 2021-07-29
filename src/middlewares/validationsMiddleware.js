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
				throw new Error('Recordá ingresar una imagen');
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
						throw new Error('Recordá ingresar una imagen');
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
		.isLength({ min: 3 }).withMessage('La ciudad debe tener al menos 3 caracteres'),
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
		.optional({ checkFalsy: true }).bail()	
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),		
	body('confirmPassword')		
		.optional({ checkFalsy: true }).bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
		.matches(passwordChars).withMessage('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial').bail()
		.custom((confirmPassword, {req}) => {
			const password = req.body.passwordNew;
			if(password === confirmPassword) {
				return true;
			} else {
				throw new Error('Las contraseñas no coinciden');
			}
		}),
];

const validateRegProduct = [ 
	body('name').notEmpty().withMessage('Recordá ingresar un nombre').bail().isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
	body('category').notEmpty().withMessage('Recordá ingresar un nombre').bail().isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
	body('brand').notEmpty().withMessage('Recordá ingresar un nombre').bail().isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
	body('model').notEmpty().withMessage('Recordá ingresar un modelo'),
	body('description').notEmpty().withMessage('Recordá ingresar un modelo').bail().isLength({ min: 20 }).withMessage('La descripción no puede contener menos de 20 caracteres'),
	body('specs').notEmpty().withMessage('Debes completar las especificaciones técnicas del producto'),
	body('keywords').notEmpty().withMessage('Debes ingresar al menos una palabra clave'),
	body('price').notEmpty().withMessage('El campo precio es obligatorio').bail().isNumeric().withMessage('El precio debe ser numérico'),
	body('discount').notEmpty().withMessage('El campo de descuento es obligatorio').bail().isNumeric().withMessage('El descuento debe ser numérico').bail().isInt({gt: -1, lt: 100}).withMessage('El descuento debe estar entre 0 y 99'),
	body('stock').notEmpty().withMessage('El campo de stock es obligatorio').bail().isNumeric().withMessage('El stock debe ser numérico'),
	body('stockMin').notEmpty().withMessage('Debes indicar un stock mínimo').bail().isNumeric().withMessage('El stock mínimo debe ser numérico').bail().isInt({gt:0}).withMessage('El stock mínimo no puede ser menor a 1'),
	body('stockMax').notEmpty().withMessage('Debes indicar un stock máximo').bail().isNumeric().withMessage('El stock máximo debe ser numérico').bail().isInt({gt:1}).withMessage('El stock máximo no puede ser menor a 1'),
];

const validateEditProduct = [
	body('name').notEmpty().withMessage('Recordá ingresar un nombre').bail().isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
	body('model').notEmpty().withMessage('Recordá ingresar un modelo'),
	body('description').notEmpty().withMessage('Recordá ingresar un modelo').bail().isLength({ min: 20 }).withMessage('La descripción no puede contener menos de 20 caracteres'),
	body('specs').notEmpty().withMessage('Debes completar las especificaciones técnicas del producto'),
	body('keywords').notEmpty().withMessage('Debes ingresar al menos una palabra clave'),
	body('price').notEmpty().withMessage('El campo precio es obligatorio').bail().isNumeric().withMessage('El precio debe ser numérico'),
	body('discount').notEmpty().withMessage('El campo de descuento es obligatorio').bail().isNumeric().withMessage('El precio debe ser numérico').bail().isInt({gt: 0, lt: 99}).withMessage('El descuento debe estar entre 0 y 99'),
	body('stock').notEmpty().withMessage('El campo de stock es obligatorio').bail().isNumeric().withMessage('El stock debe ser numérico'),
	body('stockMin').notEmpty().withMessage('Debes indicar un stock mínimo').bail().isNumeric().withMessage('El campo debe ser numérico').bail().isInt({gt:1}).withMessage('El stock mínimo no puede ser menor a 1'),
	body('stockMax').notEmpty().withMessage('Debes indicar un stock máximo').bail().isNumeric().withMessage('El campo debe ser numérico').bail().isInt({gt:1}).withMessage('El stock máximo no puede ser menor a 1'),
];
const validateCurses = [
	
	body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio').bail()
	.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
	.isAlpha().withMessage ("El nombre no puede contener numeros"),

    body('description').notEmpty().withMessage('La descripción del producto no puede estar vacia')
	.isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif'];

		if (!file){
			throw new Error ('Tienes que subir una imagen')
		} else {
        let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}}
        return true;
	}),
	body('duration').notEmpty().withMessage ("la duración no puede estar vacia")
	.isNumeric().withMessage('La duracion debe ser numerica debe ser numérico').bail().isInt({gt: 1, lt: 180}).withMessage('La duracion debe ser entre 1 a 180 días'),
	body('price').notEmpty().withMessage('El campo precio es obligatorio').bail()
	.isNumeric().withMessage('El precio debe ser numerico').bail().isInt({gt: 1}).withMessage('El precio debe ser mayor a 1'),
    
	body('discount').isNumeric().withMessage('El descuento debe ser numerico').bail().isInt({gt: 1, lt: 100}).withMessage('El descuento tiene que estar en el rango de 0 a 100'),
	body('initialCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),
	body('minimalCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),
	body('actualCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),];

	const validateServices = [
	
		body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio').bail()
		.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
		.isAlpha().withMessage ("El nombre no puede contener numeros"),
];
const validateEditCurses = [
	
	body('name').notEmpty().withMessage('El nombre del producto no puede estar vacio').bail()
	.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
	.isAlpha().withMessage ("El nombre no puede contener numeros"),

    body('description').notEmpty().withMessage('La descripción del producto no puede estar vacia')
	.isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif'];

		if (!file){
			throw new Error ('Tienes que subir una imagen')
		} else {
        let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}}
        return true;
	}),
	body('duration').notEmpty().withMessage ("la duración no puede estar vacia")
	.isNumeric().withMessage('La duracion debe ser numerica debe ser numérico').bail().isInt({gt: 1, lt: 180}).withMessage('La duracion debe ser entre 1 a 180 días'),
	body('price').notEmpty().withMessage('El campo precio es obligatorio').bail()
	.isNumeric().withMessage('El precio debe ser numerico').bail().isInt({gt: 1}).withMessage('El precio debe ser mayor a 1'),
    
	body('discount').isNumeric().withMessage('El descuento debe ser numerico').bail().isInt({gt: 1, lt: 100}).withMessage('El descuento tiene que estar en el rango de 0 a 100'),
	body('initialCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),
	body('minimalCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),
	body('actualCapacity').notEmpty().withMessage ("la Capacidad no puede estar vacia").bail().isNumeric().withMessage('La capacidad debe ser numerica').bail().isInt({gt: 5, lt: 35}).withMessage('La capacidad tiene que estar en el rango entre 5 y 35'),];

	




	









module.exports = { validateUserRegister, validateRegProduct, validateEditProduct, validateUserLogin, validateUserEdit,validateCurses, validateServices, validateEditCurses }
	