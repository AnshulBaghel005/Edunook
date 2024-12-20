const express=require('express');
const router=express.Router();

const {sendOTP}=require('../controllers/otpController');
const {signupController,loginController}=require('../controllers/auth');

router.post('/sendOTP',sendOTP);
router.post('/signup',signupController);
router.post('/login',loginController);

//middleware
router.get('/test',auth,(req,res)=>{
    res.status(200).json({
        message:'testing middleware'
    })
})
router.get('/student',auth,isStudent,(req,res)=>{
            res.status(200).json({
            message:"This is protected route for Student"
            })
})

module.exports=router;