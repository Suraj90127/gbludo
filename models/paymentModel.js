import mongoose from "mongoose";


const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counters', counterSchema);

const getNextSequenceValue = async (sequenceName) => {
    const counter = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );
    return counter.seq;
};

const paymentSchema=new mongoose.Schema({
    orderid:{
        type:String,
        unique: true
    },
    phone:{
        type:Number,
    },
    amount:{type:Number},
     transactionsId:{type:String     
    },
    status:{type:Number,default:0},
    type:{type:String,default:"bank"},
    utr:{type:String,default:null},
    createdAt: { type: Date, default: Date.now },
})
// Pre-save hook to set the orderid
paymentSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.orderid = await getNextSequenceValue('paymentOrderId');
    }
    next();
});
export default  mongoose.model('payment', paymentSchema);


