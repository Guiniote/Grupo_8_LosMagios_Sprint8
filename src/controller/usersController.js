let db = require('../database/models');
const User = db.User;
const bcryptjs = require('bcryptjs');
//const {validationResult} = require('express-validator'); Dejo comentado esto porque no pude tomar bien los errores del validador en el registerProcess

const userController = {

    detail: (req, res) =>{
        console.log('entre a detalle de usuario')
        console.log('----------------------------')
        let usertId = req.params.id;
        User.findByPk(usertId)
            .then(users => {
                res.render('users/profile', {users});
            });
    },
    
    register: (req, res) => {
        User.findAll()
        .then(users => {
            res.render('users/register')
        });
    },
    registerProcess: async (req, res) =>{
        /*Tengo que chequear la validacion
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                
            });
        }*/
        let userEmail = await User.findOne({where: {email: req.body.email}});
        if (userEmail) {
            return res.render('users/register', {
                users,
                errors: {
                    email: {
                        msg: 'El email ya se encuentra registrado'
                    }
                },
                oldData: req.body
            });
        }
        try{
            let userCreated = await User.create({
                firstName: req.body.firstName,
                surname: req.body.surname,
                userName: req.body.userName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename,
            });
            return res.redirect('/users/login');
        } catch(error) {
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

    login: (req, res) => {
        return res.render('users/login');
    },
    loginProcess: async (req, res) => {
        try{
        let userToLogin = await User.findOne({where: {email: req.body.email}});
        console.log(userToLogin);
        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 5 })
                    }
                    return res.redirect('/users/profile');
            } 
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'El email o la contraseña son inválidos'
                    }
                }
            });
            
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'El email o la contraseña son inválidos    '
                }
            }
        });
    }
    catch(error){
        console.log(error);
    }
    },
    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = userController;