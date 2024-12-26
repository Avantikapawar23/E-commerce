const express = require('express');
const router= express.Router();
const userController = require('../controller/user_controller');
const path = require("path");

const multer  = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../storage1/profile_img')); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPEG, PNG, and JPG formats are allowed.'));
      }
      cb(null, true);
    }
  });

router.post('/register',upload.single('profileImg'),userController.registerUser);
router.post('/loginUser',userController.loginUser);
router.get('/getallCust',userController.getAllCustomer);
router.put('/forgetPass',userController.forgetPassword);

module.exports = router;