const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    accountType:{
        type:String,
        require:true,
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