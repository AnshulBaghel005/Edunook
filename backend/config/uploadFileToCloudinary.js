const cloudinary=require('../config/cloudinary')
async function uploadFileInCloudinary(file,folder){
    const options={folder};
    options.resource_type='auto';
    return await cloudinary.uploader.upload(file.tempFilePath);
}
const uploadFile=(file,folder)=>{
    const isFileSupport=(fileType,fileSupport)=>{
        return fileSupport.include(file);
    }
    try{
        let fileSupport=['png','jpeg'];
        let fileType=thumbnail.name.split('.')[1].toLowerCase();
        if(isFileSupport(fileType,fileSupport)){
             uploadFileInCloudinary(file,folder);
        }


    }catch(err){
        console.log(err);
        console.log("error in file uploading")
    }
}