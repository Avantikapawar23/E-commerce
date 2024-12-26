const cartModel = require('../models/cart');
var jwt = require('jsonwebtoken');




async function createCart(req, res) {
     var userID =  req.id ;
    const {productID} = req.body;

    try {
        const newcart = await cartModel({productID,userID,quantity:1});
        newcart.save();

        res.status(201).json({
            status: 1,
            message: 'cart created successfully',
            newcart
        })

    } catch (error) {
        res.status(500).json({ error });
    }

}

async function getUserCart(req, res) {
    var userID =  req.id ;
   

   try {
       var cart = await cartModel.find({userID:userID});
    
               res.status(201).json({
                status: 1,
                message: 'cart find successfully',
                cart
                
            })

   } catch (error) {
       res.status(500).json({ error });
   }

}

async function manageCartProductQuantity(req, res) {
    const { itemID, manipulate } = req.body;
    console.log({ itemID, manipulate });

    // // Early validation
    // if (!itemID || (manipulate !== "Add"  manipulate !== "Minimize")) {
    //     return res.status(400).json({ status: 0, message: "Product can only be added or removed" });
    // }

    try {
        let item;
        if (manipulate === "Add") {
            item = await cartModel.findOneAndUpdate(
                { _id: itemID },
                { $inc: { quantity: 1 } },
                { new: true }
            );
        } else {
            item = await cartModel.findOneAndUpdate(
                { _id: itemID }, // Fixed incorrect key from `id` to `_id`
                { $inc: { quantity: -1 } },
                { new: true }
            );
        }

        if (!item) {
            return res.status(404).json({ status: 0, message: "Cart item not found" });
        }

        res.status(200).json({
            status: 1,
            message: 'Cart updated successfully',
            item
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ status: 0, message: "Internal server error", error });
    }
}



module.exports = {
     createCart,
     getUserCart,
     manageCartProductQuantity,

}
