const TAG=require('../models/tags');

exports.createTag=async(req,res)=>{
    try{
        //fetch data
        const {name,description}=req.body;
        //validation
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:'all filed are required'
            })
        }
        //save in db
        let tagDetails=await TAG.create({
            name:name,
            description:description
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"Tags create successfully"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in Create Tag"
        })
    }
}

exports.getAllTags=async(req,res)=>{
    try{
        //fecth data from db
          const AllTagDetails=await TAG.find({},{name:true,description:true});
          res.status(200).json({
            success:true,
            message:'all tags are get',
            AllTagDetails
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