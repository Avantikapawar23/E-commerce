const express = require('express');
const router= express.Router();
const adminController = require('../controller/admin_controller');

router.post('/register',adminController.registeradmin);
router.post('/login',adminController.loginadmin);

module.exports = router;