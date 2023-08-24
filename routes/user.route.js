const express = require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const existuser= await UserModel.findOne({email})
        console.log(existuser)
       if(existuser){
        res.send({msg:"user already present"})
       }else{
        const hash = bcrypt.hashSync(password,5);
        req.body.password=hash
        const user=new UserModel(req.body)
        await user.save()
        res.send({msg:"registered sucessfully"})
       }
    } catch (error) {
        res.send({msg:error.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await UserModel.findOne({email})
        if(user){
            const decode=await bcrypt.compareSync(password,user.password);
            if(decode){
                const token=jwt.sign({
                    userid: user._id,
                    username:user.name,
                  }, process.env.secretkey, { expiresIn:"1h" });
                  res.send({
                    "msg":"user login sucessful",
                    "token":token
                  })
            }else{
                res.status(201).send("please check your password")
            }


        }


    } catch (error) {
        console.log(error)
    }
})


module.exports={userRoute}