const express = require('express');
const router = express.Router();
const controladorHome = require('../controller/homeController');

router.get ('/', controladorHome.show);
router.get('/quienessomos', controladorHome.whoWeAre);

module.exports = router;