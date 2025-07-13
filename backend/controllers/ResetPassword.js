
const USER=require('../models/user');
const mailSender = require('../utils/mailSender');
const bcrypt = require("bcrypt");
exports.resetPasswordToken=async(req,res)=>{
    try{
        //get email from req body
        const {email}=req.body;
        
        if(!email){
            return res.status(401).json({
                success:false,
                message:'fill details carefully'
            })
        }
        //check user for this email,email validation
        const user=await USER.findOne({email:email});
        console.log('user',user);
        if(!user){
            return res.status(401).json({
                success:false,
                message:'your email is not registerd'
            })
        }
        //generate token
        const token=crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails=await USER.findOneAndUpdate(
            {email:email},
            {token:token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            {new:true});
       //create url jo frontend ka url hoga
       const url=`https://localhost:3000/upadte-password/${token}`
       
       //send mail containing the url
       await mailSender(email,
        "Password Reset Link",
        `Password Reset Link: ${url}`
       );

       res.status(200).json({
        success:true,
        message:'Email sent successfully for reset password'
       })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'error in reset password token'
        })
    }
}

//reset password

exports.resetPassword=async(req,res)=>{
    try{
        //data fetch
        const {password,confirmPassword,token}=req.body;
        //validation
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password not matching'
            })
        }
        //get userDetails from db using token
        let userDetails=await USER.findOne({token:token});
        //if no entry-invalid token
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:'token not find'
            })
        }
        //token time check
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                success:false,
                message:'token expired'
            })
        }
        //hash password
        let hashpassword=await bcrypt.hash(password,10);

        await USER.findByIdAndUpdate(
            {token:token},
            {password:hashpassword},
            {new:true},
        );
        //return response
        res.status(200).json({
            success:false,
            message:'password update successfully'
        })
        

    }catch(err){
        return res.status(400).json({
            success:false,
            message:'something went wrong while reset password'
        })
    }
}