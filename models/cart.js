const mongoose = require('mongoose');
const CartScama = new mongoose.Schema({
   
    
    productID:{
        type:mongoose.Schema.Types.ObjectId,   
        required:true,
        ref:'product'
    },
    quantity:{
        type:Number,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }

    
})
module.exports = mongoose.model('cart',CartScama)