const mongoose=require("mongoose")

const commentSchema = new mongoose.Schema({
  username:{type:String, trim:true},
  content:{type:String, trim:true}
});

const validCategories=["Business","Tech", "Lifestyle", "Entertainment"];

const blogSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    title:{type:String, required:true, trim:true},
    content:{type:String, required:true, trim:true},
    category:{type:String, required:true, trim:true, enum:validCategories},
    date:{type:Date, required:true, trim:true},
    likes:{type:Number, required:true, trim:true, default:0},
    comments:[commentSchema]
});

const BlogModel=mongoose.model("Blog",blogSchema);

module.exports={BlogModel};


// {
//     "username": "coreyschafer",
//     "title": "Be Present",
//     "content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
// 		"category" : "Entertainment",
// 		"date" : "2017-06-01",
// 		"likes" : 24,
// 		"comments" : "Good One"
// }


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTQzOGE3ODVkYmY1YjZkMTI0OGFhOWYiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY5ODkyOTIyNywiZXhwIjoxNjk5NTM0MDI3fQ.WpLYTEdaHluz43dTm-lWYOJwjQmc1HXPrSyfxnsrMVo