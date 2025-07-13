const ratingAndreview=require('../models/RatingandReview');
const Course=require('../models/course');
const { default: mongoose } = require('mongoose');

//create rating and review
exports.createRating=async(req,res)=>{
    try{
        //get user id
        const userId=req.user.id;
        //fetch data from req body
        const {rating,review,courseId}=req.body;
        //check if user  enrolled or  not
        const courseDetails=await Course.findById(courseId);
        if(!courseDetails.studentEnrolled.include(userId)){
              return res.status(400).json({
                success:false,
                message:"user is not enrolled of this course"
              })
        }
        //check user already reviewed or not
        const alreadyReviewed=await ratingAndreview.findById({
                                                            user:userId,
                                                            course:courseId
                                                            })
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"user is already reviwed of this course"
              })
        }
        //create rating and review
        const ratingReview=await ratingAndreview.create({rating,review,course:courseId,user:userId});
        //update course 
        await Course.findByIdAndUpdate(
                                     courseId,
                                     {
                                      $push:{RatingandReview:ratingReview._id}
                                    },
                                    {new:true}                                                
        )
        return res.status(200).json({
            success:true,
            message:'rating and review successfully create'
        })
        

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:'Something went wrong in creating rating and review'
        })
    }
}

//get avg rating
exports.getAvgRating=async(req,res)=>{
    try{
        //get courseId
        const {courseId}=req.body;
        //cal avg rating
        const result=await ratingAndreview.aggregate([
            {  //string to object id
                $match:{
                    course:new mongoose.Types.ObjectId({courseId})
                }
            },
            {
                $group:{
                    _id:null,
                    avgRating:{$avg:'$rating'}
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                success:true,
                avgRating:result[0].avgRating,
            })
        }

    }catch(err){
        return res.status(400).json({
            success:false,
            message:'Something went wrong in geting avg rating'
        })
    }
}

//get all rating and review

exports.getAllratingReview=async(req,res)=>{
    try{
         const allReview=await ratingAndreview.find({})
                                               .sort({rating:'desc'})
                                              .populate({
                                                path:'user',
                                                select:"firstName lastName email"
                                              })
                                              .populate({
                                                path:'course',
                                                select:"courseName"
                                              })
                                              .exec();

         return res.status(200).json({
            success:true,
            data:allReview
         })                                       
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:'Something went wrong in geting all rating and review'
        })
    }
    
}