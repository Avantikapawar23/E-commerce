
const express = require('express');
const router= express.Router();
const wishlistController = require('../controller/wishlist_controller');
const verifyToken = require('../middleware/auth');


router.post('/add',verifyToken,wishlistController.addToWishlist);
router.get('/get', verifyToken,wishlistController.getWishlist);
router.delete('/remove',verifyToken,wishlistController.removeFromWishlist);



module.exports = router;
