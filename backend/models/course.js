const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        require:true,
    },
    courseDescription:{
        type:String,
        require:true,
        trim:true
    },
    whatYouWillLearn:{
        type:String,
        require:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section',
    }],
    RatingandReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingandReview',
    }],
    price:{
        type:Number,
        require:true,
    },
    thumbnail:{
        type:String,
     
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag',
    }],
    studentEnrolled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
});

module.exports=mongoose.model('Course',courseSchema);