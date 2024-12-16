const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expries:5*60,
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,'Verification Email from StuduNotation',otp)
        console.log("Email sent successfully",mailResponse)
    }
    catch(err){
        console.log('error occured while sending email',err)
    }

}
otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next();
})
module.exports=mongoose.model('OTP',otpSchema)