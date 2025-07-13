const express=require('express');
const router=express.Router();

const {sendOTP}=require('../controllers/otpController');
const {signupController,loginController}=require('../controllers/auth');
const {createCourse, getCourse}=require('../controllers/Course')
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")
// const{createTag,getAllTags}=require('../controllers/Tags')

router.post('/auth/sendOTP',sendOTP);
router.post('/auth/signup',signupController);
router.post('/auth/login',loginController);
router.post('/course/createCourse',createCourse);
router.get('/course/getAllCourses',getCourse);


//router.post('/create-Tag',createTag);
//router.get('/showTag',getAllTags)

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
router.post("/createCategory",  createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

module.exports=router;