const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=async(req,res,next)=>{
try {
    
    const {token}=req.body
    console.log(token)
    if(token){
        const isTokenvalid = await jwt.verify(token,process.env.secretkey)
       console.log(isTokenvalid);
        if(isTokenvalid){
            req.body.username=isTokenvalid.username
            req.body.user=isTokenvalid.userid
            next()
        }else{
            res.send({msg:"pls login first"})
        }
    }else{
        res.send({msg:"pls login first"})
    }
} catch (error) {
    console.log(error)
}

}
module.exports={auth}