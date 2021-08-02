const { User } = require('../../database/models');
const { Op } = require("sequelize");


const apiUsersController = {
    list: (req, res) =>{
        User.findAll(
            {
                attributes: ['id','username','email']


            }
            
        )
        .then (users =>{
return res.status(200).json ({
total: users.length,
data: users,
status: 200
})
 })
},
show: (req,res)=>{
    User.findByPk(req.params.id,{attributes:
['id','firstName','surname','email','zipCode','city','telephone','avatar']})
    .then (user =>{
return res.status(200).json ({
data: {userId: user.id,
    firstName: user.firstname,
    surName: user.surname,
    email: user.email,
    zipCode: user.zipCode,
    city: user.city,
    telephone: user.telephone,
    avatar: req.headers.host + '/images/avatars/' + user.avatar,
},
status: 200
})
})}}
module.exports = apiUsersController;