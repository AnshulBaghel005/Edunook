const mongoose=require('mongoose');
require('dotenv').config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('db connection successful')
    }).catch((err)=>{
            console.log(err);
            console.log("db coomection error")
        })
}

module.exports=dbConnect;