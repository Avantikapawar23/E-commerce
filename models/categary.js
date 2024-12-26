const mongoose = require('mongoose');
const CategaryScama = new mongoose.Schema({
   
    
    name:{
        type:String,    
        required:true
    },
    
})
module.exports = mongoose.model('categary',CategaryScama)