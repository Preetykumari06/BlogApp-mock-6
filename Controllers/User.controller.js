const {UserModel}=require("../Models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

require('dotenv').config()

const userSignup=async (req,res)=>{
    let {username,avatar,email,password,role}=req.body

    try{
        let user=await UserModel.findOne({email})
        if(user){
            return res.status(409).send({"success":false, "error":"Already exist please login."})
        }

        const hash=bcrypt.hashSync(password, 6)
        let newUser=new UserModel({username,avatar,email,password:hash,role})
        console.log(newUser)
        await newUser.save()
        res.status(200).send({"success":true, "message":"New user registered successfully."})
    }catch(error){
        res.status(400).send({"error":error.message})
    }
}

const userLogin=async (req,res)=>{
    let {email,password}=req.body;

    try{
        let user=await UserModel.findOne({email})
        if(!user){
            return res.status(409).send({"success":false, "error":"Wrong email."})
        }

        bcrypt.compare(password, user.password, function (err,result) {
            if(err){
                return res.status(500).send({"success":false, "error":"An error occurred during password comparison."})
            }

            if(result){
                const token=jwt.sign({userID:user._id, role:user.role}, 
                 process.env.accesstoken, {expiresIn:'7d'});

                 return res.status(200).send({"success":true, "message":"Login successfull.", token:token});
            } else {
                return res.status(401).send({"success":false, "error":"Wrong password."})
            }
        });
    }catch(error){
        return res.status(500).send({"success":false, "error":"An error occurred while processing the request."})
    }
};

module.exports={
    userSignup,userLogin
}