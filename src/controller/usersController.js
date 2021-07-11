const bcryptjs = require('bcryptjs');
const path = require('path');
let db = require('../database/models');
const User = db.User;

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
		        /*res.locals.userLogged = req.session.userLogged;
                console.log(locals.isLogged);
                console.log(locals.userLogged.userName);*/
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
        /*let usertId = req.params.id;
        User.findByPk(usertId)
            .then(users => {
               // res.json(product)
                res.render('users/profile', {users});
            });*/
            //console.log(req.session.userLogged.avatar);
            return res.render('users/profile', {
                user: req.session.userLogged
            });
    },
    
    add: (req, res) => {
        /*User.findAll()
        .then(users => {
            */res.render('users/register'/*, {users})
        }*/);
    },
    create: async (req, res) =>{       
        try{
            User.create({
				/*firstName: req.body.firstName,
				surname: req.body.surname,
				userName: req.body.userName,
				email: req.body.email,
				password: req.body.password,
				avatar: req.body.avatar,*/
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename
            })

            return res.redirect('login');

        } catch(error) {
            res.send(error)
        }
    },
 


    edit: (req, res) => {
        /*let userId = req.params.id;
        let promUsers = User.findByPk(userId)

        Promise
        .all([promUsers])
        .then(([users]) => {
            return res.render(path.resolve(__dirname, '..', 'views', 'users',  'edit'), {users})
        })
        .catch(error => res.send(error))*/
        return res.render('users/edit', {
            user: req.session.userLogged
        });
    },
    update: async (req, res) => {        
        let user = req.body;
        user.id = req.params.id;        
        if (req.body.passwordOld && bcryptjs.compareSync(req.body.passwordOld, req.session.userLogged.password)) {
        //if (req.body.passwordOld && bcryptjs.hashSync(req.body.passwordOld, 10) === req.session.userLogged.password) {
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
	}
}

module.exports = usersController;