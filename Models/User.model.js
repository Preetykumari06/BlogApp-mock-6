const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
   username:{type:String, required:true, trim:true},
   avatar:{type:String, required:true, trim:true},
   email:{type:String, required:true, unique:true, trim:true},
   password:{type:String, required:true, trim:true},
   role:{
    type:String,
    required:true,
    default:"User",
    enum:["User", "Admin"],
   }
},{
    versionKey:false,
    timestamps:true
})

const UserModel=mongoose.model("User", userSchema)

module.exports={UserModel}



// "username":"Preety",
//   "avatar":"",
//   "email":"pr123@gmail.com",
//   "password":"preety",
//   "role":"User"

// - Username
// - Avatar 
// - Email
// - Password