const WishlistModel = require('../models/wishlist');

async function addToWishlist(req, res) {
    const { productId } = req.body; 
    const userId = req.id; 

    console.log(userId)
    try {
        let wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            wishlist = new WishlistModel({ userId, items: [] });
        }

        const isProductExists = wishlist.items.some((item) => item.productId.toString() === productId);

        if (isProductExists) {
            return res.status(400).json({ message: 'Product is already in the wishlist.' });
        }

        wishlist.items.push({ productId });
        await wishlist.save();

        res.status(201).json({
            message: 'Product added to wishlist successfully.',
            wishlist,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding to the wishlist.', error: error.message });
    }
}

async function getWishlist(req, res) {
    const userId = req.id;

    try {
        const wishlist = await WishlistModel.findOne({ userId }).populate('items.productId');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found.' });
        }

        res.status(200).json({
            message: 'Wishlist retrieved successfully.',
            wishlist,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the wishlist.', error: error.message });
    }
}

async function removeFromWishlist(req, res) {
    const { productId } = req.body;
    const userId = req.id;

    try {
        const wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found.' });
        }

        // Filter out the product from the wishlist
        wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId);
        await wishlist.save();

        res.status(200).json({
            message: 'Product removed from wishlist successfully.',
            wishlist,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing the product from the wishlist.', error: error.message });
    }
}

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};
