const USER=require('../models/user');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser')

exports.signupController=async(req,res)=>{
    try{
        //
        const {firstName,lastName,email,password,role}=req.body;
        if(!firstName||!lastName||!email||!password||!role){
            return res.status(401).json({
                success:false,
                message:'please fill all deatails carefully'
            })
        }
        let existingUser=await USER.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:'user already registered'
            })
        }
        let hashpassword=await bcrypt.hash(password,10);
        console.log('hashpassword',hashpassword);

        await USER.create({firstName,lastName,email,password:hashpassword,role});

        return res.status(200).json({
            success:true,
            message:'user successfully sing in '
        })


    }catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:'signin error'
        })


    }
}

exports.loginController=async(req,res)=>{
    try{
        //
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({
                success:false,
                message:'please fill all deatails carefully'
            })
        }
        let registeredUser=await USER.findOne({email});
        if(!registeredUser){
            return res.status(401).json({
                success:false,
                message:'user not registered'
            })
        }
        let payload={
             email:registeredUser.email,
             role:registeredUser.role
        }
        let hashpassword= registeredUser.password;
        if(await bcrypt.compare(password,hashpassword)){
            let token=await JWT.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'2h'
            })
            registeredUser=registeredUser.toObject();
            registeredUser.password=undefined;
            registeredUser.token=token;
            let options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie('token',token,options).status(200).json({
                registeredUser,
                token,
                success:true,
                message:"login successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:'password is incorrect '
            })
        }
        return res.status(200).json({
            success:true,
            message:'user successfully sing in '
        })


    }catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:'login error'
        })


    }
}