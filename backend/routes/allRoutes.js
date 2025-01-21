const express=require('express');
const router=express.Router();

const {sendOTP}=require('../controllers/otpController');
const {signupController,loginController}=require('../controllers/auth');
const {createCourse}=require('../controllers/Course')
const{createTag,getAllTags}=require('../controllers/Tags')

router.post('/sendOTP',sendOTP);
router.post('/signup',signupController);
router.post('/login',loginController);
router.post('/create-course',createCourse);
router.post('/create-Tag',createTag);
router.get('/showTag',getAllTags)

const {auth,isStudent,isAdmin,isInstructor}=require('../middleware/auth');
//middleware
router.get('/test',auth,(req,res )=>{
    res.status(200).json({
        message:'testing middleware'
    })
})
router.get('/student',auth,isStudent,(req,res)=>{
            res.status(200).json({
            message:"This is protected route for Student"
            })
})
router.get('/Admin',auth,isAdmin,(req,res)=>{
    res.status(200).json({
    message:"This is protected route for Admin"
    })
})
router.get('/Instructor',auth,isInstructor,(req,res)=>{
    res.status(200).json({
    message:"This is protected route for Instructor"
    })
})

module.exports=router;