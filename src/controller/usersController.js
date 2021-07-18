const bcryptjs = require('bcryptjs');
const path = require('path');
let db = require('../database/models');
const User = db.User;
const { validationResult } = require('express-validator');

const usersController = {

    login: (req, res) => {
		res.render('users/login');
	},

    loginProcess: async (req, res) => {
        let userToLogin = await User.findOne({
            where: { email: req.body.email }});
        
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;  
                res.locals.isLogged = true;		        
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

    list: (req, res) => {
        User.findAll()
        .then(users => {
            res.render('users/users.ejs', {users})
        });
    },

    profile: (req, res) =>{        
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },
    
    add: (req, res) => {
        res.render('users/register');
    },

    create: async (req, res) =>{               
        let errors = validationResult(req);        
        if (errors.isEmpty()) {        
            console.log("ENTRO AL IF POSITIVO");
            try{
                User.create({                    
                    ...req.body,
                    address: NULL,
                    telephone: NULL,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: req.file.filename
                })

                return res.redirect('login');

            } catch(error) {
                res.send(error)
            }
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                oldData: req.body
            })
        }
    },
 


    edit: (req, res) => {
        return res.render('users/edit', {
            user: req.session.userLogged
        });
    },
    update: async (req, res) => {        
        let user = req.body;
        user.id = req.params.id;        
        if (req.body.passwordOld && bcryptjs.compareSync(req.body.passwordOld, req.session.userLogged.password)) {
            user.password = req.body.passwordNew && req.body.passwordNew == req.body.passwordConfirm ? bcryptjs.hashSync(req.body.passwordNew, 10) : req.session.userLogged.password;        
        } else {
            user.password = req.session.userLogged.password;
        }
        
        user.avatar = req.file ? req.file.filename : req.session.userLogged.avatar;                
        
        try {
            User.update(
                user,                 
                {
                    where: {id: user.id}
                }
            );            
            
            req.session.userLogged = user;

            return res.redirect('/users/profile')
        } catch (error) {
            res.send(error)
        } 
    },

    destroy: (req, res) =>{
        let userId = req.params.id;
        User.destroy({where: {id: userId}, force: true})
        .then(()=>{
            return res.redirect('/users')})
        .catch(error => res.send(error)) 
    },

    // Función para desloguearse
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

    findUserByEmail: async (emailIngresado) => {
        return await User.findOne({
            where: { email: emailIngresado }});        
    }
}



module.exports = usersController;