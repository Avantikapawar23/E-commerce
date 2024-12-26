const mongoose = require('mongoose');
const usersScama = new mongoose.Schema({
    name:{
        type:String,
        required:true
     
    },
    password:{
        type:String,    
        required:true
    },
    profileImg:{
        type:String,    
        required:false
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:false
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,   
        required:false,
        ref: 'Users'
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        required :false,
        ref: 'Users'
    }

})
module.exports = mongoose.model('Users',usersScama)