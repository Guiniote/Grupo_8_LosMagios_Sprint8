const express = require('express');
const router = express.Router();
const controladorHome = require('../controller/homeController');

router.get ('/', controladorHome.show);
router.get('/quienessomos', (req,res) => {
    res.render ('partials/quienesSsomos')
});
module.exports = router;