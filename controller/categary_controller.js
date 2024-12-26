const categaryModel = require('../models/categary');

async function createCategary(req, res) {
    const { name } = req.body;

    try {
        const newcategary = await categaryModel({name});
        newcategary.save();

        res.status(201).json({
            status: 1,
            message: 'categary created successfully',
            newcategary
        })

    } catch (error) {
        res.status(500).json({ error });
    }

}

async function deletingCategary(req, res) {
    const categaryID = req.params.categaryID;

    try {
        const deleteStatus = await categaryModel.findOneAndDelete(categaryID);

        res.status(201).json({
            status: 1,
            message: 'categary deleted successfully',deleteStatus
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function Updatecategary(req, res) {
    const categaryID = req.params.categaryID;
    const name = req.body.name;
// console.log(status);
    // console.log(taskID);    
    

    try {
        var Updatecategary = await categaryModel.findByIdAndUpdate (categaryID,
        {name:"name"},
        {new:true, runValidators:true}
    )

        res.status(201).json({
            status: 1,
            message: 'categary Update successfully',Updatecategary
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}



module.exports = {
    createCategary,
    deletingCategary,
    Updatecategary,
}
