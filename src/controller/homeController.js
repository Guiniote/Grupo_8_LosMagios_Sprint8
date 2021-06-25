let homeController = {
    show: (req, res) => {
        res.render('home');
    },
    whoWeAre: (req,res) => {
        res.render('partials/quienesSomos')
    }
}

module.exports = homeController;