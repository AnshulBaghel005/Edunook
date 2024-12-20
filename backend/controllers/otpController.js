const OTP=require('../models/otp');

exports.sendOTP=async(req,res)=>{
    try{
        const otp=Math.floor(900000+Math.random()*100000);
        console.log('otp',otp);
        

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'error in sending otp'
        })
    }
}
