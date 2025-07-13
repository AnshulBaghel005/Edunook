const mongoose=require('mongoose');

const RatingandReviewSchema=new mongoose.Schema({
    rating:{
        type:String,
        require:True,
    },
    review:{
        type:String,
        require:True,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'

    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Course'


    }
})

module.exports=mongoose.model('RatingandReview',RatingandReviewSchema)