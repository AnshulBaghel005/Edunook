const USER = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const OTP = require("../models/otp");
const profile=require('../models/Profile')
require("dotenv").config();

const cookieParser = require("cookie-parser");

exports.signupController = async (req, res) => {
  try {
    //
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "please fill all deatails carefully",
      });
    }
    //check password and confirm password same
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not match,please try again",
      });
    }
    let existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }
    const fetchOTP = await OTP.findOne({otp});
    console.log("recentOTP", fetchOTP);
    if (!fetchOTP) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    }
    let hashpassword = await bcrypt.hash(password, 10);
    console.log("hashpassword", hashpassword);

    const profileDeatails = await profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    //image reh gya hai
    const user = await USER.create({
      firstName,
      lastName,
      email,
      password: hashpassword,
      accountType,
      additionDetails: profileDeatails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      message: "user successfully sing in ",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "signin error",
    });
  }
};

exports.loginController = async (req, res) => {
  try{
    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({
            message:'please fill the details carrefully'
        })
    }

    let user=await USER.findOne({email});
    if(!user){
        return res.status(400).json({
            message:'please sign in'
        })
    }
    let payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType
    }
    if(await bcrypt.compare(password,user.password)){
        let token=await JWT.sign(payload,
            process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
        user=user.toObject();
        user.token=token;
        user.password=undefined   
        
        let options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
         res.cookie("babarCookie",token,options).status(200).json({
            user,
            token,
            message:'user login successfully'
        })

    }
    else{
        return res.status(400).json({
            message:'password incorrect'
        })
    }


}
   catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "login error",
    });
  }
};

// exports.changePassword = async (req, res) => {
//   let { email, oldPassword, newPassword, confirmNewPassword } = req.body;
//   if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
//     return res.status(401).json({
//       success: false,
//       message: "please fill all deatails carefully",
//     });
//   }
//   const user = await USER.findOne({ email });
//   if (!user) {
//     return res.status(400).json({
//       success: false,
//       message: "your email not registered with us",
//     });
//   }

//   if (oldPassword != user.password) {
//     return res.status(400).json({
//       success: false,
//       message: "password not match",
//     });
//   } else {
//     if (newPassword != confirmNewPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "password not match",
//       });
//     }
//   }
//   let hashpassword = await bcrypt.hash(newPassword, 10);
//   console.log("hashpassword", hashpassword);
//   const userData = await USER.create({ password: hashpassword });
//   console.log("chage password", userData);
//   //send mail passwod upadted

//   res.status(200).json({
//     success: false,
//     message: "password change successfully",
//   });
// };
