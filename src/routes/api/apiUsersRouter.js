const express = require('express');
const router = express.Router();
const apiUsersController = require('../../controller/api/apiUsersController');


router.get('/', apiUsersController.list);
router.get('/:id', apiUsersController.show);



module.exports = router;