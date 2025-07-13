const Section=require('../models/section');
const SubSection=require('../models/subSection')
require('../config/uploadFileToCloudinary')
require('dotenv').config();
exports.createSubSection=async(req,res)=>{
    try{
        //input data
        const{title,timeDuration,description,sectionId}=req.body;
        const video=req.files.videoFile;
        //validation
        if(!title||!timeDuration||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"all fileds are required",
            })
        }
        //upload video in clodinary
        const uploadDetails=await uploadFile(video,process.env.Folder_name);
        //save
        const newSubSection=await SubSection.create({
                                                    title:title,
                                                    description:description,
                                                    timeDuration:timeDuration,
                                                    videoUrl:uploadDetails.secure_url
                                                })
        //update                                        
        await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true})
        //return res
        return res.status(200).json({
            success:true,
            message:"subsection create successfully"
        })



    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in creating subSection"
        })
    }
}
//update subsection
exports.updateSubSection=async(req,res)=>{
    try{
        //input data
        const{title,timeDuration,description,sectionId}=req.body;
        const video=req.files.videoFile;
        //validation
        if(!title||!timeDuration||!description||!sectionId){
            return res.status(400).json({
                success:false,
                message:"all fileds are required",
            })
        }
        //upload video in clodinary
        const uploadDetails=await uploadFile(video,process.env.Folder_name);
        //save
        const newSubSection=await SubSection.findByIdAndUpdate(sectionId,{
                                                    title:title,
                                                    description:description,
                                                    timeDuration:timeDuration,
                                                    videoUrl:uploadDetails.secure_url
                                                },{new:true})
        //update                                        
    //    await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true})
        //return res
        return res.status(200).json({
            success:true,
            message:"subsection update successfully"
        })



    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in updating subSection"
        })
    }
}

//delete subsection
exports.deleteSubSection=async(req,res)=>{
    try{
        const subSectionId=req.param;
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"subSection delete successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in deleting subSection"
        })
    }
}