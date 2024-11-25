import mongoose from "mongoose";


const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

const getNextSequenceValue = async (sequenceName) => {
    const counter = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );
    return counter.seq;
};

const withdrawalSchema=new mongoose.Schema({
    orderid:{
        type:String,
        unique: true
    },
    phone:{
        type:Number,
    },
    amount:{type:Number},

    name:{type:String,default:0},
    accountNo:{type:Number,default:0},
    ifsc:{type:String,default:0},
    upi:{type:String,default:0},
    status:{type:Number,default:0}, 
 
    createdAt: { type: Date, default: Date.now },
})
// Pre-save hook to set the orderid
withdrawalSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.orderid = await getNextSequenceValue('withdrawalOrderId');
    }
    next();
});
export default  mongoose.model('withdrawals', withdrawalSchema);


