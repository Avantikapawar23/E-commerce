const productsModel = require('../models/product')

async function addProducts(req,res){
    const {name,price,disprice,description,img,categaryType} = req.body;
    

    try{

        if(!name || !price || !disprice || !description || !img || !categaryType){
            return res.status(400).json({message: "Please fill all fields."})
        }
        var product = productsModel({
            name,price,disprice,description,img,categaryType
        });

    await product.save();
    res.json({message: "Product added successfully", product: product});
}catch(error){
    res.status(500).json({error})
}
}

async function getAllProducts(req,res){
    try{
        const allproducts = await productsModel.find().populate('categaryType','name');

        res.status(201).json({
            message: "Products retrieved successfully",
            allproducts,
        });
    } catch (error){
        res.status(500).json({ message: "Error something went wrong", error });
    }
}

module.exports = {
    addProducts,
    getAllProducts,
    
};
