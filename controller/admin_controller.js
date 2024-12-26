
const adminModel = require('../models/admin');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//create admin
async function registeradmin(req,res){
    const {name, phone,password} = req.body;
    const saltRounds = 10;

    var hashPassword = await bcrypt.hash(password, saltRounds)

    try{
    const newadmin = await adminModel({name,phone,password:hashPassword});

    newadmin.save();

    res.status(201).json({
        status:1,
        message:'admin created successfully',
        newadmin
    })

}catch(error){
    res.status(500).json({error})
}
}




async function loginadmin(req, res) {
    const { phone, password } = req.body;
    try {
      const user = await adminModel.findOne({ phone });
      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found with this number please enter valid mobile number ",
          });
      }
      const decryptPassword = await bcrypt.compare(password, user.password);
      console.log(decryptPassword);
      console.log(user.password);
  
      if (decryptPassword) {
        var token = jwt.sign(
          {
            id: user._id,
            phone: user.phone,
            role:"admin"
          },
          "privatekey",
          { expiresIn: "365d" }
        );
  
        return res.status(200).json({
          message: "admin found successfully",
          user,
          token,
        });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }


module.exports = {
    registeradmin,
    loginadmin,
}
