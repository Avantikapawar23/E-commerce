const mongoose = require('mongoose');
const adminScama = new mongoose.Schema({

    name:{
        type:String,    
        required:true
    },
    password:{
        type:String,    
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:false
    }
   
})
module.exports = mongoose.model('admin',adminScama)