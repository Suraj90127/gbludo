import mongoose from "mongoose";

const kycSchema=new mongoose.Schema({
    orderid:{
        type:String,
        // unique: true
    },
    phone:{
        type:Number,
    },
    status:{type:Number,default:0},
    image1:{type:String},  
    image2:{type:String},  
    createdAt: { type: Date, default: Date.now },
})

export default  mongoose.model('kyc', kycSchema);
