import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BetSchema = new Schema({
    // creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String},
    battleId:{type:Number},
    phone:{type:Number},
    type:{type:String,default:"Ludo"},
    amount: { type: Number, required: true },
  recieve:{ type: Number },
  getAmount:{ type: Number,default:0 },
    room: { type: String,default:null},
status:{type:String,default:null},
description:{type:String,default:"0"},
betstatus:{type:String,default:"0"},
    // acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    acceptedBy: [
        {
            name:{type:String},
            phone:{type:Number},
            description:{type:String,default:"0"},
            status:{type:String,default:0},
            get:{ type: Number,default:0 },
        }
    ],
    createdAt: { type: Date, default: Date.now },
    // Add other bet fields as necessary
});

export default  mongoose.model('Bet', BetSchema);
