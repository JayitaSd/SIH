import mongoose, { Mongoose } from "mongoose";
const cropsSchema=new mongoose.Schema({
    district:{type:String,required:true},
    crop:{type:String,required:true},
    season:{type:String,required:true},
    area:{type:Number,required:true,min:1},
    fertilizerUse:{type:Number,required:true,min:0},
    pesticideUse:{type:Number,required:true,min:0},
    temp:{type:Number,required:true,min:0,max:100},
    humidity:{type:Number,required:true,min:0,max:100},
    n:{type:Number,required:true,min:0,max:100},
    p:{type:Number,required:true,min:0,max:100},
    k:{type:Number,required:true,min:0,max:100},
    pH:{type:Number,required:true,min:1,max:14}
})
const cropInfo=mongoose.model("cropInfo",cropsSchema);
export default cropInfo