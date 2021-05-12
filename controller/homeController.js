//COMENTO TODO LO QUE NO SIRVE PARA CARGAR NUESTRA HOME, EN BASE AL DE EJEMPLO

const jsonDB = require('../model/jsonDatabase');
//const homeModel = jsonDB('home');

let homeController = {
    show: (req, res) => {
        //const home = homeModel.all();
        res.render('home')//, { home });
    }
}

module.exports = homeController;