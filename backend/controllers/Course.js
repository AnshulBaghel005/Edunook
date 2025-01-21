const USER=require('../models/user');
const Course=require('../models/course');
const Tags=require('../models/tags')
const uploadFile=require('../config/uploadFileToCloudinary');
require('dotenv').config();
exports.createCourse=async(req,res)=>{
    try{
        //fetch data
        const{courseName,courseDescription,price,whatYouWillLearn,tags,id}=req.body;
    //   const thumbnail=req.files.thumbnail;
    //   console.log(thumbnail,'thumbnail')
        
        if(!courseName||!courseDescription||!price||!whatYouWillLearn||!tags){
            return res.status(400).json({
                success:false,
                message:'all fields are required'
            })
        }
       
     
       console.log('userID')
        // const userId=req.user;
       console.log(id)

        const instructorDetails=await USER.findById(id)
        console.log("instructorDetails ", instructorDetails)
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"instructor not found"
            })        
        }
        
    //   check given tag is valid or not
        const tagsDetails=await Tags.findById("678caa6fe2ce3a803e615df8")
        if(!tagsDetails){
            return res.status(400).json({
                success:false,
                message:"Tag Details  not found"
            })        
        }
        console.log("tagdetails:-",tagsDetails)
      // upload file 
      //uploadFile(thumbnail,process.env.folder_name)
        
      // create entry for new course
        const newCourse=await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            price:price,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
           tags:tagsDetails._id,
        })
 //    add new course to user Schema of instructor
     await USER.findByIdAndUpdate(
        {_id:instructorDetails._id},
    {
        $push:{
            Course:newCourse._id
        }
    },{new:true}
)

return res.status(200).json({
    message:"course create successfully",
    newCourse
})


    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:'something went wrong in creating a course'
        })
    }
}

exports.getAllCourse=async(req,res)=>{
    try{
        //fecth data from db
          const AllCourse=await Course.find({});
          if(!AllCourse){
            res.status(400).json({
                success:false,
                message:'no course found',
          })

          }
          res.status(200).json({
            success:true,
            message:'all course are get',
            AllCourse
          })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'something went wrong in get All Tags'
        })

    }
}