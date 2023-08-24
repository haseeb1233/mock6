const express=require("express")
const {auth}=require("../middleware/auth.middlewar")
const {BlogModel}=require("../models/blog.model")

const blogRoute=express.Router()

blogRoute.post("/blog",auth,async (req,res)=>{
    let obj={
        username:req.body.username,
        title:req.body.title,
    content:req.body.content,
    category:req.body.category,
    user:req.body.user
    }
    console.log(obj)
  const blog=new BlogModel(obj)
  await blog.save()
  res.send({msg:"blog added sucessfully"})  
})


blogRoute.get("/blog",auth,async(req,res)=>{
     const {title,category,sort}=req.query
     console.log(title)
     if(title){
        const blog = await BlogModel.find({title})
     res.send({msg:blog})
     }else if(category){
        const blog = await BlogModel.find({category})
        res.send({msg:blog})
     }else if(sort){
        const data=await BlogModel.find().sort({addedAt:req.query.order})
        res.send(data)
     }
     
     else{
        const blog=await BlogModel.find()
     res.send({msg:blog})
     }
})

blogRoute.put("/:id",auth,async(req,res)=>{
    const data=await BlogModel.findByIdAndUpdate(req.params.id,req.body)
    res.status(204).send("data updated sucessfully")
})

blogRoute.delete("/:id",auth,async(req,res)=>{
    try {
        await BlogModel.findByIdAndDelete(req.params.id)
        res.send({msg:"sucessfully deleted"})
    } catch (error) {
        res.send({msg:error})
    }
})

blogRoute.put("/blog/like/:id",auth,async(req,res)=>{
   try {
    console.log(req.params.id)
    const data=await BlogModel.findById(req.params.id)

    if(data.likes.includes(req.body.user)){
        res.send({msg:"already liked"})
    }else{
        data.likes.push(req.body.user)
        await BlogModel.findByIdAndUpdate(req.params.id,data)
        
        res.send({msg:"posted suceessfully"})
    }
    
    
   } catch (error) {
    console.log(error);
   }
})

blogRoute.put("/blog/comment/:id",auth,async(req,res)=>{
    try {
        const data=await BlogModel.findById(req.params.id)
        const {username,content}=req.body
        let obj={
           username,
           content
        }

        data.comment.push(obj)
        await BlogModel.findByIdAndUpdate(req.params.id,data)
        res.send({msg:"commented sucessfully"})
    } catch (error) {
        
    }
})

module.exports={blogRoute}
