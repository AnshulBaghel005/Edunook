const mongoose=require('mongoose');

const tagSchema=new mongoose.Schema({
    tagName:{
        type:String,
        require:true
    },
    tagDescription:{
        type:String,
        require:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },

 
});

module.exports=mongoose.model('Tag',tagSchema);