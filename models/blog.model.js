const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    username:String,
    title:String,
    content:String,
    category:String,
    likes:{type:Array,
      default:[]
    },
    comment:{type:Array,
      default:[]
    }
},
{
    timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports={BlogModel}