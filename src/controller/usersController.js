const path = require('path');
let db = require('../database/models');
const User = db.User;

const usersController = {

    login: (req, res) => {
		res.render('users/login');
	},

    list: (req, res) => {
        User.findAll()
        .then(users => {
            res.render('users/users.ejs', {users})
        });
    },
    profile: (req, res) =>{
        let usertId = req.params.id;
        User.findByPk(usertId)
            .then(users => {
               // res.json(product)
                res.render('users/profile', {users});
            });
    },
    
    add: (req, res) => {
        User.findAll()
        .then(users => {
            res.render('users/register.ejs', {users})
        });
    },
    create: async (req, res) =>{
        try{
            let userCreated = await User.create({
				firstName: req.body.firstName,
				surname: req.body.surname,
				userName: req.body.userName,
				email: req.body.email,
				password: req.body.password,
				avatar: req.body.avatar,
            })

            return res.redirect('/users');

        } catch(error) {
            res.send(error)
        }
    },

    edit: (req, res) => {
        let userId = req.params.id;
        let promUsers = User.findByPk(userId)

        Promise
        .all([promUsers])
        .then(([users]) => {
            return res.render(path.resolve(__dirname, '..', 'views', 'users',  'edit'), {users})
        })
        .catch(error => res.send(error))
    },
    update: async (req, res) => {
        try {
            let user = req.body;
            user.avatar = req.file ? req.file.filename : req.body.oldAvatar;
            if (req.file===undefined) {
                user.avatar = req.body.oldImage
            } else {
                user.avatar = req.file.filename 
            }
            delete user.oldAvatar;

            let userId = req.params.id;
            const userUpdate = await User.update(
                {
                    firstName: req.body.firstName,
                    surname: req.body.surname,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
                {
                    where: {id: userId}
                }
            );
            return res.redirect('/users')
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
    }
}

module.exports = usersController;