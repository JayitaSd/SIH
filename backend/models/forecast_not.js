// const mongoose = require("mongoose");
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  alertMsg: { type: String, required: true },
  date: { type: String, required: true },
  day: { type: String, required: true },
  recipients: [{type:String,required:true}], 
  sentAt: { type: Date, default: Date.now }
});

// module.exports = mongoose.model("Notification", notificationSchema);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;