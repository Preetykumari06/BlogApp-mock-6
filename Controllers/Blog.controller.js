const { query } = require("express");
const {BlogModel}=require("../Models/Blog.model");

const addBlog=async(req,res)=>{
  const {userID,title,content,category,date,likes,comments}=req.body;

  try{
    const blog=new BlogModel({userID,title,content,category,date,likes,comments});
    await blog.save();
    res.status(200).send({"success":true, "message":"New Blog is added."})
  }catch(error){
   res.status(400).send({"error":error.message});
  }
};

const editBlog=async(req,res)=>{
    const blogId=req.params.id;
    const updatedBlogData=req.body;
    const {userID}=req.body;

    try{
        const data=await BlogModel.findById(blogId);
        if(data.userID.equals(userID)){
            const blog=await BlogModel.findByIdAndUpdate(blogId,updatedBlogData, {
                new:true,
            });
            res.status(200).send({"success":true, "message":"Blog is edited by the user."})
        } else {
            res.status(200).send({"success":true, "message":"This blog was not created by you so you are not able to edit it."})
        }
    }catch(error){
        res.status(400).send({"error":error.message});
    }
}

const deleteBlog=async(req,res)=>{
    const blogId=req.params.id;
    const {userID}=req.body;

    try{
        const data=await BlogModel.findById(blogId);
        if(data.userID.equals(userID)){
            let blo=await BlogModel.findByIdAndDelete(blogId);
            res.status(200).send({"success":true, "message":"Blog is deleted by the user."})
        } else {
            res.status(200).send({"success":true, "message":"This blog was not created by you so you are not able to delete it."})
        }
    }catch(error){
        res.status(400).send({"error":error.message});
    }
}

const getBlog=async(req,res)=>{
    console.log(req,query);
    let {title,date,category,order}=req.query;

    try{
        // filters objects for the query
        const filters={};
        if(title){
            filters.title=new RegExp(title,'i');
        }
        if(category){
            filters.category=new RegExp(category,'i');
        }
        if(date){
            filters.date=new Date(date);
        }

    //    sort objects based on the order parameter
         const sort={};
         if(order==="asc"){
            sort.date=1;
         } else if(order==="dsc"){
            sort.date=-1;
         }

        //  filters & sort in the query
        const data=await BlogModel.find(filters).sort(sort);
        res.status(200).send({"success":true,data:data,"message":"All Blogs data successfully fetched."});

    }catch(error){
        res.status(400).send({"error":error.message});
    }
}

const likeBlog=async(req,res)=>{
    const blogId=req.params.id;

    try{
        const blog=await BlogModel.findByIdAndUpdate(blogId, {$inc:{likes:1}},{
            new:true,
        })
        res.status(200).send({"success":true,"message":"Blog liked successfully", data:blog});
    }catch(error){
        res.status(400).send({"error":error.message});
    }
}

const commentBlog=async(req,res)=>{
    const blogId=req.params.id;
    const {username,content}=req.body;

    try{
        const blog=await BlogModel.findByIdAndUpdate(blogId, {$push:{comments:{username,content}}},{
            new:true,
        })
        res.status(200).send({"success":true,"message":"Comment added successfully", data:blog});
    }catch(error){
        res.status(400).send({"error":error.message});
    }
}

module.exports={
    addBlog,editBlog,deleteBlog,getBlog,likeBlog,commentBlog
}