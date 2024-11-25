import mongoose from "mongoose";

const adminSettingSchema = new mongoose.Schema({
  name: { type: String, default: "Admin" },
  upi: { type: String, default: "upi" },
  battleCommission1: {
    type: Number,
    default: 0,
  },
  referralCommission: {
    type: Number,
    default: 0,
  },
  battleCommission0: {
    type: Number,
    default: 0,
  },
  signUpBonus: {
    type: Number,
    default: 0,
  },
  money: {
    type: Number,
    default: 0,
  },
  telegram: {
    type: String,
    default: null,
  },
  whatsapp: {
    type: Number,
    default: null,
  },
  telegram: {
    type: String,
    default: null,
  },
  game: [
    {
      gname: { type: String },
      gimage: { type: String },
      gstatus: { type: Number, default: 1 },
    },
  ],
  marquee: { type: String, default: "" },
  marqueestatus: { type: String, default: "show" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("adminSetting", adminSettingSchema);
