const mongoose = require('mongoose');
const productScama = new mongoose.Schema({
    
    name:{
        type:String,    
        required:true
    },
    price:{
        type:Number,    
        required:true
    },
    
    disprice:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:false,
        default:2
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    categaryType:{
            type:mongoose.Schema.Types.ObjectId,   
            required:true,
            ref: 'categary'
        },
   
})
module.exports = mongoose.model('product',productScama)