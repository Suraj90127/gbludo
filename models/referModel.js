import mongoose from "mongoose";

const referSchema=new mongoose.Schema({
 
   referid:{type:String},
   phone:{type:Number},
   invite:{type:String},
   money:{type:Number},
   phone:{type:String},
   code:{type:String},
   inviteBy:{type:Number},
   createdAt: { type: Date, default: Date.now },
    
  
})

export default  mongoose.model('refer', referSchema);
