const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    Avatar:String,
    email:{
        type:String,
        required:true

    },
    password:{
         type:String,
         required:true
    }
})

const UserModel=mongoose.model("user",userSchema)



module.exports={UserModel}