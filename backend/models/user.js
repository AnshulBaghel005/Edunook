const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    additionDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    image:{
        type:String,
        require:true
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courseProgresss'
            
        }]
});

module.exports=mongoose.model('User',userSchema);