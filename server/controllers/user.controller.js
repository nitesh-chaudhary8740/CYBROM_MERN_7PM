const { User } = require("../models/user.model")

const userRegistration  =async (req,res) => {
try {
    console.log("req, received")
  const  {userName,fullName,courseName,duration,contact}=req.body
  if(Object.values(req.body).some((field)=> field===""))
  {
    throw new Error("all feilds required")
  }
  const existingUser= await User.findOne({userName})
  console.log(existingUser)
  if(existingUser) throw new Error("user existed")
    console.log("is here")
const user = await User.create({
    userName,
    fullName,
    courseName,
    duration,
    contact
})
  res.status(200).json(
    {message:"user registered successfully",data:user,success:true}
  )
    }
 catch (error) {
    res.status(400).json({success:false,err:error.message})
}
}
const getAllUsersData = async(req,res)=>{
    const allUsers = await User.find();
    res.status(200).json(
    {message:"users fetched successfully",data:allUsers,success:true}
  )
}
const deleteAUser = async(req,res)=>{
    const user_id = req.params.user_id;
    console.log(user_id,typeof user_id)
 
    const user= await User.findByIdAndDelete(user_id)
   res.status(200).json(
    {message:`user ${user.userName}} deleted successfully`,success:true})
}
const updateAUser = async(req,res)=>{
    const user_id = req.params.user_id;
     const  {userName,fullName,courseName,duration,contact}=req.body
  if(Object.values(req.body).some((field)=> field===""))
  {
    throw new Error("all feilds required")
  }

 
     await User.findByIdAndUpdate(user_id,{
        userName,fullName,courseName,duration,contact
     })

    res.status(200).json(
    {message:`user ${userName} updated successfully`,success:true}
  )
}
const searchResults = async(req,res)=>{
    console.log("see",req.params.value)
    const {seach} =req.params.value
    const searhResults = User.find({$or:[{userName:seach},{fullName:seach},{courseName:seach}]})
    res.status(200).json({data:seach})
}
module.exports = {userRegistration,getAllUsersData,deleteAUser,updateAUser,searchResults}