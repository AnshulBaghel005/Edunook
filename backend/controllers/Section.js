const Section=require('../models/section');
const Course=require('../models/course');

exports.createSection=async(req,res)=>{
    try{
        //input data
        const {sectionName,courseId}=req.body;
        //validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"all filed are required"
            })
        }
        //save in db
        const section=await Section.create({sectionName});
        //update course;
        await Course.findByIdAndUpdate(
                                       courseId,
                                       {$push:{courseContent:section._id}},
                                       {new:true}
                                    )
        //return response
        return res.status(200).json({
            success:true,
            message:"Section is creating successfully",
            section
        })


    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong on creating section"
        })
    }
}

exports.updateSection=async(req,res)=>{
    try{
          //input data
          const {sectionName,sectionId}=req.body;
          //validation
          if(!sectionName||!sectionId){
              return res.status(400).json({
                  success:false,
                  message:"all filed are required"
              })
          }
          const updateSection=await Selection.findByIdAndUpdate(sectionId,{$push:{sectionName:sectionName}},{new:true})
          return res.status(200).json({
            success:true,
            message:"Section update successfully",
            updateSection
        })


    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in updating section"
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        const sectionId=req.param;
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Section delete successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in deleting section"
        })
    }
}