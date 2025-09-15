import mongoose, { Mongoose } from "mongoose";
const cropsSchema=new mongoose.Schema({
   
  district: {type:String,required:true},
  crop_name: {type:String,required:true} ,// ✅ matches backend
  season_of_cultivation:  {type:String,required:true} ,
  sown_area:  {type:Number,required:true} , // ✅ matches backend
  fertilizer_usekg_ha: {type:Number,required:true} ,
  pesticide_usekg_ha:  {type:Number,required:true} ,
  avg_temperature: {type:Number,required:true} ,
  avg_humidity:  {type:Number,required:true} ,
  soil_n:  {type:Number} ,
  soil_p: {type:Number} ,
  soil_k:  {type:Number} ,
  soil_ph: {type:Number,required:true} ,


})
const cropInfo=mongoose.model("cropInfo",cropsSchema);
export default cropInfo