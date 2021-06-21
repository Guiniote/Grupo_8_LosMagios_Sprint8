const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../model/usersModel');
const usersController = {

// Función para mostrar el formulario de registro
	register: (req, res) => {
		return res.render('users/register');
	},
	//funcion para ir a quienesSomos

quienesSomos: (req, res) => {
	return res.render('users/quienesSomos');},

// Función para registrar un usuario
processRegister: (req, res) => {
	const resultValidation = validationResult(req);

	if (resultValidation.errors.length > 0) {
		return res.render('users/register', {
			errors: resultValidation.mapped(),
			oldData: req.body
		});
	}

	let userInDB = User.findByField('email', req.body.email);

	if (userInDB) {
		return res.render('users/register', {
			errors: {
				email: {
					msg: 'Este email ya está registrado'
				}
			},
			oldData: req.body
		});
	}

	let userToCreate = {
		...req.body,
		password: bcryptjs.hashSync(req.body.password, 10),
		avatar: req.file.filename
	}

	let userCreated = User.create(userToCreate);

	return res.redirect('login');
},

// Función para mostrar formulario de login
	login: (req, res) => {
		res.render('users/login');
	},

// Función para loguear un usuario
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;
				if(req.body.remember_me) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 5 })
				}
				return res.redirect('/users/profile');
			}			
		}
		return res.render('users/login', {
			errors: {
				email: {
					msg: 'Las credenciales son inválidas'
				}
			}
		});
	},

// Función para mostrar página de perfil
	profile: (req, res) => {
		return res.render('users/profile', {
			user: req.session.userLogged
		});
	},

// Función para desloguearse
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}



module.exports = usersController;