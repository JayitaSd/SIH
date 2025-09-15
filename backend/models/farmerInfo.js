import mongoose from "mongoose";
const farmerSchema=new mongoose.Schema({
  email:{type:String,required:true},
  phone:{type:String,required:true},
  fullName:{type:String,required:true},
  // adminOrFarmer:{type:String,required:true},
  password:{type:String,required:true}
  ,confirmPassword:{type:String,required:true},
  role:{type:String,enum:["farmer","admin"],default:"farmer"}
  
});
const farmerInfo=mongoose.model("farmerInfo",farmerSchema);
export default farmerInfo;