const User=require('../models/user');
const Course=require('../models/course');
const {instance}=require('../config/razorpay');
const mailSender=require('../utils/mailSender');
const { default: mongoose } = require('mongoose');

exports.orderPayment=async(req,res)=>{
    try{
        //course id
        const {courseID}=req.body;
        //user id
        const userId=req.user.id;

        if(!courseID){
            return res.status(400).json({
                success:false,
                message:"please enter valid course id"
            })
        }
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"please enter valid user id"
            })
        }
        let course;
        try{
            course=await Course.findById(courseID);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"course not found"
                })
            }
            //user already pay for same course
            let uid=new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.include(uid)){
                return res.status(400).json({
                    success:false,
                    message:"user already enrolled in this course"
                })
            }



        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }
        //order create
        const amount=course.price;
        const currenecy='INR'

        const option={
            amount:amount*100,
            currenecy,
            recipt:Math.random(Date.now()).toString(),
            notes:{
                course:courseID,
                userId
            }
        }
        console.log('recipt:-',recipt);
        try{
            const paymentResponse=await instance.orders.create(option);
            console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                orderId:paymentResponse.id,
                currenecy:paymentResponse.currenecy,
                amount:paymentResponse.amount
            })

        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"something went wrong in order  "
            })
        }
    

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"something went wrong in order payment "
        })
    }

}