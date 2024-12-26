const express = require('express');
const router= express.Router();
const cartController = require('../controller/cart_controller');
const verifyToken = require('../middleware/auth');

router.post('/create',verifyToken,cartController.createCart);
router.get('/getcart',verifyToken,cartController.getUserCart);
router.put('/productquantity',verifyToken,cartController.manageCartProductQuantity);





module.exports = router;