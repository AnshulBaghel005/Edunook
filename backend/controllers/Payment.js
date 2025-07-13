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
                courseID:courseID,
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
//verify signature
exports.verifySignature=async(req,res)=>{
    try{
        const webhookSecret='12345678';
        const signature=req.headers["x-razorpay-signature"];
        const shasum=crypto.createHmac('sha256',webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest=shasum.digest('hex');

        if(digest==signature){
            console.log("Payment is authorized")
             //fullfill the action

            try{
                const {courseID,userId}=req.body.payload.payment.entity.notes
                //find the course and enrolled student
                const courseResponse=Course.findByIdAndUpdate(courseID,{$push:{studentEnrolled:userId}},{new:true});
                if(!courseResponse){
                    return res.status(400).json({
                        success:false,
                        message:"course not found"
                    })
                }
                console.log("enrolledCourse",courseResponse)
                //find student and add course
                const enrolledStudent=Course.findByIdAndUpdate(userId,{$push:{course:courseID}},{new:true});
                console.log("enrolledStudent",enrolledStudent);

                //send confirmation mail
                const mailResponse=mailSender(enrolledStudent.email,"Congratulation From codehelp","congratulation,you successsfully enrolled ")
                console.log('mailResponse',mailResponse);

                res.status(200).json({
                    success:true,
                    message:"signature verified and student enrolled for course successFully"
                })

            }
            catch(err){
                return res.status(400).json({
                    success:false,
                    message:"something went wrong in action "
                })
            }     
        }
       


    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"something went wrong in authorization of payment "
        })
    }
}