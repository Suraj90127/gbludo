import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Countertransaction', counterSchema);

const getNextSequenceValue = async (sequenceName) => {
    const counter = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );
    return counter.seq;
};

const transactionSchema=new mongoose.Schema({
    orderid:{
        type:Number,
        // unique: true,
    },
    phone:{
        type:Number,
    },
    amount:{type:Number},
    closeBalance:{type:Number},
    status:{type:Number,default:0},
    type:{type:String,default:"Cash Added"},  
    createdAt: { type: Date, default: Date.now },
})

// Pre-save hook to set the orderid
transactionSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.orderid = await getNextSequenceValue('transactionOrderId');
    }
    next();
});

export default  mongoose.model('transactions', transactionSchema);


