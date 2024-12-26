
const usersModel = require('../models/users');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


async function registerUser(req,res){
    const {name, phone,password,address} = req.body;
    const profile_img = req.file;

    if(!profile_img){
      return res.status(400).json({message: "profile image is required"});
    }
    const profileImgUrl = `/storage1/profileImg/${profile_img.filename}`;
   
    var saltRounds = 10;

    var hashPassword = await bcrypt.hash(password, saltRounds)

    try{
    const newUser = await usersModel({name,phone,address,password:hashPassword,profileImg:profileImgUrl});

    newUser.save();

    res.status(201).json({
        status:1,
        message:'User created successfully',
        newUser
    })

}catch(error){
    res.status(500).json({error})
}
}




async function loginUser(req, res) {
    const { phone, password } = req.body;
    try {
      const user = await usersModel.findOne({ phone });
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
            role:"customer"
          },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
  
        return res.status(200).json({
          message: "user found successfully",
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


  async function getAllCustomer(req,res){
    try{
        const allusers = await usersModel.find();

        res.status(201).json({
            message: "users retrieved successfully",
            allusers
        });
    } catch (error){
        res.status(500).json({ message: "Error something went wrong", error });
    }
}

async function forgetPassword(req, res) {
  console.log("step1")
   var {phone,password} = req.body;
   console.log(phone)

    try {

      const saltRounds = 10;
      console.log("step3")

      var hashPassword = await bcrypt.hash(password, saltRounds)
  
        var user = await usersModel.findOneAndUpdate({phone:phone},
          {password:password},
          {new: true}
        )
        if(!user){
          return res.status(404).json({ message: "User not found" });
        }
  console.log("step4")
       
        return res.status(200).json({ message: "Password updated successfully",user });

    } catch (error) {
        res.status(500).json({ error });
    }
}






module.exports = {
    registerUser,
    loginUser,
    getAllCustomer,
    forgetPassword,
}
