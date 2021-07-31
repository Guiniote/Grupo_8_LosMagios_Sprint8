const { User } = require('../../database/models');
const { Op } = require("sequelize");


const apiUsersController = {
    list: (req, res) =>{
        User.findAll()
        .then (users =>{
return res.status(200).json ({
total: users.length,
data: users,
status: 200
})
 })
},
show: (req,res)=>{
    User.findByPk(req.params.id)
    .then (user =>{
return res.status(200).json ({
data: user,
status: 200
})
})





}








}


    
    
    
    
    
    
    
    module.exports = apiUsersController;