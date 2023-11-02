const {Router}=require("express")
const { addBlog, editBlog, deleteBlog, getBlog, likeBlog, commentBlog } = require("../Controllers/Blog.controller")
const { auth } = require("../Middlewares/Auth.middleware")
const { verifyrole } = require("../Middlewares/verifyrole.middleware")
const blogRouter=Router()

blogRouter.post("/api/blogs",auth,verifyrole(["User"]),addBlog)
blogRouter.patch("/api/blogs/:id",auth,verifyrole(["User"]),editBlog)
blogRouter.delete("/api/blogs/:id",auth,verifyrole(["User"]),deleteBlog)
blogRouter.get("/api/blogs",auth,getBlog)
blogRouter.patch("/api/blogs/:id/like",auth,verifyrole(["User"]),likeBlog)
blogRouter.patch("/api/blogs/:id/comment",auth,verifyrole(["User"]),commentBlog)

module.exports={blogRouter}