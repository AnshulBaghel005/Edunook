const User=require('../models/user');
const Profile=require('../models/Profile');

exports.updateProfile=async(req,res)=>{
    try{
        //input data
        const{gender,about="",dateOfBirth="",contactNumber}=req.body;
        const userId=req.user.id;
        //validation
        if(!gender||!about||!dateOfBirth||!contactNumber||!userId){
            return res.status(400).json({
                success:false,
                message:"All fileds are required"
            })
        }
        //find profile id
       const userDetails=await User.findById(userId);
       const profileId=userDetails.additionDetails;
       const profileDeatails=await Profile.findById(profileId);
       //update profile
       profileDeatails.dateOfBirth=dateOfBirth;
       profileDeatails.gender=gender;
       profileDeatails.about=about;
       profileDeatails.contactNumber=contactNumber;
       await profileDeatails.save();
       //return response
       return res.status(200).json({
        success:true,
        message:"Profile update successfully",
        profileDeatails
       })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in update profile"
        })
    }
}

//delete account
exports.deleteAccount=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userDetails=await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                succeess:false,
                message:"user not found"
            })
        }
        // delete profile
       await Profile.findByIdAndDelete({_id:userDetails.additionDetails});
       //delete user
       await User.findByIdAndDelete({_id:userId});

       return res.status(200).json({
        succeess:true,
        message:"account delete successfully"
       })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in deleteAccount"
        })
    }
}
//get all details of user
exports.getAllDetails=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userDetails=await User.findById(userId).populate("additionDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                succeess:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            succeess:true,
            message:"user details",
            userDetails
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in fetching user details"
        })
    }
}