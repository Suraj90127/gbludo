import adminModel from "../models/adminModel.js";
import betModel from "../models/betModel.js";
import kycModel from "../models/kycModel.js";
import paymentModel from "../models/paymentModel.js";
import referModel from "../models/referModel.js";
import transactionHistoryModel from "../models/transactionHistoryModel.js";
import userModel from "../models/userModel.js";
import withdrawalModel from "../models/withdrawalModel.js";
import cloudinary from "cloudinary";
import QRCode from "qrcode";


function generateUserId() {
  const characters = "0123456789";
  let battale = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    battale += characters[randomIndex];
  }
  return battale;
}

// get all user
export const getAllUser = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(201).send({
      success: true,
      message: "get all users successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

// get single user
export const getUserAdmin = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.id);
    res.status(201).send({
      success: true,
      message: "get single users successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const getUserBank = async (req, res) => {
  try {
    const data1 = await userModel.findById(req.params.id);
    const data = await withdrawalModel
      .findOne({
        phone: data1.phone,
      })
      .sort({ _id: -1 });
    res.status(201).send({
      success: true,
      message: "get single users successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const blockedUser = async (req, res) => {
  try {
    const data = await userModel.find({ status: "de-active" });
    res.status(201).send({
      success: true,
      message: "get block users successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const singleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const data = await betModel.find({
      $or: [
        { phone: user.phone },
        {
          phone:
            user.acceptedBy && user.acceptedBy[0]
              ? user.acceptedBy[0].phone
              : null,
        },
      ],
    });
    res.status(201).send({
      success: true,
      message: "get single users successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const data = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );
    res.status(201).send({
      success: true,
      message: "update user status successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const newBattle = async (req, res) => {
  try {
    const data = await betModel.find({ room: null });
    res.status(200).json({
      success: true,
      message: "Show bets",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const newBattleDelete = async (req, res) => {
  try {
    const data = await betModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "delete bet successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const runningBattle = async (req, res) => {
  try {
    const data = await betModel.find({
      status: "1",
      acceptedBy: { $elemMatch: { status: "0" } },
    });
    res.status(200).json({
      success: true,
      message: "running bets",
      data,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const battleResult = async (req, res) => {
  try {
    const data = await betModel.find({
      betstatus: "0",
      $or: [
        { status: { $in: ["win", "loss", "cancel"] } },
        { "acceptedBy.0.status": { $in: ["win", "loss", "cancel"] } },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Show bet results",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const battleDispute = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await betModel.findByIdAndUpdate(
      id,
      { betstatus: "2" }, // Ensure room is an object or the appropriate data type
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Show bets results",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const battleView = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await betModel.findById(id);
    res.status(200).json({
      success: true,
      message: "Show bets results",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};



export const battleControll = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const betid = await betModel.findById(id);


    if (betid.betstatus == "1") {
      return res.status(200).json({
        success: true,
        message: "Bet result already completed",
        data,
      });
    }

    const user = await userModel.findOne({ phone: betid.phone })
    const invitesData = await userModel.findOne({ code: user.invite });

    const data = await adminModel.findOne({});

    let referralCommission = 0;
    if (data != null) {
      referralCommission = data?.referralCommission;

    }


    if (name == "1") {
      const data = await betModel.findByIdAndUpdate(
        id,
        {
          betstatus: "1",
          getAmount: betid.recieve,
          status: "win",
        },
        { new: true }
      );

      await userModel.findOneAndUpdate(
        { phone: betid.phone },
        {
          //   $inc: { money: betid.recieve, earning: betid.recieve },
          $inc: { money: betid.recieve },

        },
        { new: true }
      );

      betid.acceptedBy[0].status = "loss";
      await betid.save();

      await transactionHistoryModel.create({
        phone: betid.phone,
        amount: betid.recieve,
        type: "win",
        closeBalance: 0,
        status: 1,
      });
      await transactionHistoryModel.create({
        phone: betid.acceptedBy[0].phone,
        amount: betid.amount,
        type: "loss",
        closeBalance: 0,
        status: 2,
      });

      
      




      // refer commission
      if (invitesData != null) {
        await referModel.create({
          referid: generateUserId(),
          phone: invitesData.phone,
          money: (betid.amount / 100) * Number(referralCommission),
          inviteBy: betid.phone,
        });
        await userModel.findOneAndUpdate(
          { phone: invitesData.phone },
          { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
          { new: true }
        )
      }

    
      return res.status(200).json({
        success: true,
        message: "Bet status updated to win",
        data,
      });
    } else {
      betid.acceptedBy[0].status = "win";
      betid.status = "loss";
      betid.acceptedBy[0].get = betid.recieve;
      betid.betstatus = "1";
      const statuss = await betid.save();

const user22=await userModel.findOne({phone: betid.acceptedBy[0].phone})

      const user2 = await userModel.findOneAndUpdate(
        { phone: betid.acceptedBy[0].phone },
        {
          //   $inc: { money: betid.recieve, earning: betid.recieve },
          $inc: { money: betid.recieve },
        },
        { new: true }
      );

      await transactionHistoryModel.create({
        phone: betid.phone,
        amount: betid.amount,
        type: "loss",
        closeBalance: 0,
        status: 2,
      });
      await transactionHistoryModel.create({
        phone: betid.acceptedBy[0].phone,
        amount: betid.recieve,
        type: "win",
        closeBalance: 0,
        status: 1,
      });

      const invitesData2 = await userModel.findOne({ code: user22.invite });
      // refer commission 2
      if (invitesData2 != null) {
        await referModel.create({
          referid: generateUserId(),
          phone: invitesData2.phone,
          money: (betid.amount / 100) * Number(referralCommission),
          inviteBy: betid.acceptedBy[0].phone,
        });
        await userModel.findOneAndUpdate(
          { phone: invitesData2.phone },
          { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
          { new: true }
        )
      }

      return res.status(200).json({
        success: true,
        message: "Bet status updated to win",
        statuss,
      });
    }

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
    console.log("error", error);
  }
};


export const battleRefund = async (req, res) => {
  const { id } = req.params;
  try {
    const betid = await betModel.findById(id);


    if (betid.status === "refund") {
      return res.status(200).json({
        success: false,
        message: "Result already submited",

      });
    }

    const data = await betModel.findByIdAndUpdate(
      id,
      {
        betstatus: "1",
        getAmount: betid.amount,
        status: "refund",
      },
      { new: true }
    );

    await userModel.findOneAndUpdate(
      { phone: betid.phone },
      {
        $inc: { money: betid.amount },
      },
      { new: true }
    );
    betid.acceptedBy[0].status = "refund";
    await betid.save();

    // Update acceptedBy with getAmount and user money
    betid.acceptedBy[0].get = betid.amount;
    const statuss = await betid.save();
    await userModel.findOneAndUpdate(
      { phone: betid.acceptedBy[0].phone },
      {
        $inc: { money: betid.amount },
      },
      { new: true }
    );



    await transactionHistoryModel.create({
      phone: betid.phone,
      amount: betid.amount,
      type: "refund",
      closeBalance: betid.amount, // Assuming user.money is the balance before the increment
      status: 1,
    });

    await transactionHistoryModel.create({
      phone: betid.acceptedBy[0].phone,
      amount: betid.amount,
      type: "refund",
      closeBalance: betid.amount, // Assuming user.money is the balance before the increment
      status: 1,
    });


    return res.status(200).json({
      success: true,
      message: "Bet status updated to refund",
      data,
      statuss,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};




export const betHistory = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    // Ensure the user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find history using the user's phone and status not equal to 0
    const data = await betModel.find({
      $or: [
        { phone: user.phone },
        { acceptedBy: { $elemMatch: { phone: user.phone } } },
      ],
      // status: { $ne: 0 }
    });

    res.status(201).json({
      success: true,
      message: "History retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const transactionHistory = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    // Ensure the user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find history using the user's phone and status not equal to 0
    const data = await transactionHistoryModel.find({ phone: user.phone });

    res.status(201).json({
      success: true,
      message: "History retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminGetKyc = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    // Ensure the user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Find history using the user's phone and status not equal to 0
    const data = await kycModel.findOne({ phone: user.phone });
    return res.status(201).json({
      success: true,
      message: "kyc data successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const adminDeletKyc = async (req, res) => {
  try {

    // Find history using the user's phone and status not equal to 0
    const data = await kycModel.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: "kyc data delete successfully",
      // data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const adminAllKyc = async (req, res) => {
  try {
    const data = await kycModel.find({});

    return res.status(201).json({
      success: true,
      message: "kyc data successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const adminGetKycDetails = async (req, res) => {
  const data = await kycModel.findById(req.params.id);
  // Ensure the user is found
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const data1 = await withdrawalModel
    .findOne({
      phone: data.phone,
    })
    .sort({ _id: -1 });
  const data2 = await userModel.findOne({ phone: data.phone });

  return res.status(201).json({
    success: true,
    message: "kyc data successfully",
    data,
    data1,
    data2,
  });
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminPendingKyc = async (req, res) => {
  try {
    const data = await kycModel.find({ status: 0 });
    return res.status(201).json({
      success: true,
      message: "kyc data successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const adminSuccessKyc = async (req, res) => {
  try {
    const data = await kycModel.find({ status: 1 });
    return res.status(201).json({
      success: true,
      message: "kyc data successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const adminRejectedKyc = async (req, res) => {
  try {
    const data = await kycModel.findByIdAndUpdate(
      req.params.id,
      { status: 2 },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "kyc rejected successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const adminApproveKyc = async (req, res) => {
  try {
    const data = await kycModel.findByIdAndUpdate(
      req.params.id,
      { status: 1 },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "kyc approved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const payRecieved = async (req, res) => {
  const data = await betModel.find({
    betstatus: "1",
  });
  try {
    res.status(200).json({
      success: true,
      message: "pay Recieved results",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const cancelBet = async (req, res) => {
  const data = await betModel.find({
    $or: [
      { status: "cancel" },
      { acceptedBy: { $elemMatch: { status: "cancel" } } },
    ],
  });
  // console.log("cancel data", data);
  try {
    res.status(200).json({
      success: true,
      message: "cencel results",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const recharge = async (req, res) => {
  try {
    const data = await paymentModel.find({ status: 0 });
    res.status(200).json({
      success: true,
      message: "get recharge successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const rechargeAll = async (req, res) => {
  try {
    const data = await paymentModel.find({});
    res.status(200).json({
      success: true,
      message: "get All recharge successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const approveRecharge = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await paymentModel.findByIdAndUpdate(
      id,
      { status: 1 }, // Ensure room is an object or the appropriate data type
      { new: true }
    );

    await userModel.findOneAndUpdate(
      { phone: data.phone }, // Correctly specifying the filter
      { 
        $inc: { 
          money: data.amount, 
          cashwon: data.amount 
        } 
      }, // Incrementing both 'money' and 'cashwon' fields
      { new: true } // Return the updated document
    );
    

    const user = await userModel.findOne({ phone: data.phone });
    await transactionHistoryModel.create({
      phone: user.phone,
      amount: data.amount,
      type: "Deposit",
      closeBalance: user.money,
      status: 1,
    });

    return res.status(200).json({
      success: true,
      message: "approve recharge successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const deletRecharge = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await paymentModel.findByIdAndUpdate(
      id,
      { status: 2 }, // Ensure room is an object or the appropriate data type
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "delet recharge successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const withdraws = async (req, res) => {
  try {
    const data = await withdrawalModel.find({ status: 0 });
    res.status(200).json({
      success: true,
      message: "get withdrawal",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const withdrawalApprove = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await withdrawalModel.findByIdAndUpdate(
      id,
      { status: 1 }, // Ensure room is an object or the appropriate data type
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Approve withdrawal successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// export const withdrawalReject = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the withdrawal document and update its status
//     const withdrawal = await withdrawalModel.findByIdAndUpdate(
//       id,
//       { status: 1 },
//       { new: true }
//     );

//     if (!withdrawal) {
//       return res.status(404).send({
//         success: false,
//         message: "Withdrawal request not found",
//       });
//     }

//     // Find the user associated with the withdrawal
//     const user = await userModel.findOne({ phone: withdrawal.phone });

//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Add the withdrawal amount back to the user's money balance
//     user.money += withdrawal.amount;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Withdrawal rejected successfully, amount refunded",
//       data: withdrawal,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Internal server error",
//       error,
//     });
//   }
// };

// export const withdrawalReject = async (req, res) => {
//     const { id } = req.params
//     try {
//         const data = await withdrawalModel.findByIdAndUpdate(
//             id,
//             { status: 1 }, // Ensure room is an object or the appropriate data type
//             { new: true })
//         res.status(200).json({
//             success: true,
//             message: "update withdrawal successfully",
//             data
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Internal server error",
//             error
//         });
//     }
// }


export const withdrawalReject = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the withdrawal document and update its status
    const withdrawal = await withdrawalModel.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true }
    );





    if (!withdrawal) {
      return res.status(404).send({
        success: false,
        message: "Withdrawal request not found",
      });
    }

    // Find the user associated with the withdrawal
    const user = await userModel.findOne({ phone: withdrawal.phone });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }


    // Add the withdrawal amount back to the user's money balance using $inc
    const updata = await userModel.findByIdAndUpdate(
      user._id,
      { $inc: { money: withdrawal.amount } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Withdrawal rejected successfully, amount refunded",
      data: withdrawal,
      updata: updata,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};




export const withdrawalAll = async (req, res) => {
  try {
    const data = await withdrawalModel.find({});
    res.status(200).json({
      success: true,
      message: "all withdrawal successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const generateQRCode = async (data) => {
  try {
    let qrCodeDataURL = await QRCode.toDataURL(data);
    console.log("QR Code generated successfully.");
    //   console.log(qrCodeDataURL);
    // Optionally, you can save the QR code to a file
    // const fs = require('fs');
    // const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, "");
    // fs.writeFileSync('qrCode.png', base64Data, 'base64');
    return qrCodeDataURL;
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};
// admin setting
export const adminSettingGet = async (req, res) => {
  try {
    const data = await adminModel.find({});
    const upiUrl = `upi://pay?pa=${data[0]?.upi}&pn=${data[0]?.name}`;
    const qrcode = await generateQRCode(upiUrl);

    res.status(200).send({
      success: true,
      message: "get all data successfully",
      data,
      qrcode,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// set upi
export const setAdminUPI = async (req, res) => {
  const { upi, name } = req.body;

  try {
    let admin = await adminModel.findOne({});

    if (admin === null) {
      const data = await adminModel.create({ upi, name });
      res.status(200).send({
        success: true,
        message: "set upi successfully",
        data,
      });
    } else {
      const data = await adminModel.findByIdAndUpdate(
        admin._id,
        { upi, name },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "update upi successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// set admin commission
export const setAdminCommission = async (req, res) => {
  const { battleCommission1, battleCommission0, referralCommission } = req.body;
  try {
    const admin = await adminModel.findOne({});
    if (admin === null) {
      const data = await adminModel.create({
        battleCommission1,
        battleCommission0,
        referralCommission,
      });
      res.status(200).send({
        success: true,
        message: "set commission create successfully",
        data,
      });
    } else {
      const data = await adminModel.findByIdAndUpdate(
        admin._id,
        {
          battleCommission1,
          battleCommission0,
          referralCommission,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "update commission successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// add telegram
export const adminTelegram = async (req, res) => {
  const { supports, supports1 } = req.body.telegram;

  try {
    const admin = await adminModel.findOne({});
    if (admin === null) {
      res.status(401).send({
        success: false,
        message: "Please add upi",
      });
    } else {
      const data = await adminModel.findByIdAndUpdate(
        admin._id,
        {
          telegram: supports,
          whatsapp: supports1,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "update telegram successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });

  }
};
// Sign Up Bonus
export const adminSignUpBonus = async (req, res) => {
  const { signUpBonus } = req.body;
  try {
    const admin = await adminModel.findOne({});
    if (admin === null) {
      res.status(401).send({
        success: false,
        message: "Please add upi",
      });
    } else {
      const data = await adminModel.findByIdAndUpdate(
        admin._id,
        {
          signUpBonus,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "update Sign Up Bonus successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// Marquee Notification
export const adminMarquee = async (req, res) => {
  const { marquee, marqueestatus } = req.body;
  try {
    const admin = await adminModel.findOne({});
    if (admin === null) {
      res.status(401).send({
        success: false,
        message: "Please add upi",
      });
    } else {
      const data = await adminModel.findByIdAndUpdate(
        admin._id,
        {
          marquee,
          marqueestatus,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "update Marquee Notification successfully",
        data,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// game admin
export const gameAdmin = async (req, res) => {
  const { gname, gstatus, gimage } = req.body;
  try {
    const admin = await adminModel.findOne({});
    if (admin === null) {
      res.status(401).send({
        success: false,
        message: "Please add upi",
      });
    } else {
      let uploadUrl = null;
      if (req.file) {
        let upload = await cloudinary.v2.uploader.upload(req?.file?.path, {
          folder: "ludo",
        });
        uploadUrl = upload.secure_url;
      }
      admin.game.push({
        gname,
        gimage: uploadUrl,
        gstatus,
      });
      const data = await admin.save();
      res.status(200).send({
        success: true,
        message: "game add successfully",
        data,
      });
    }

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// game admin update
export const gameAdminUpdate = async (req, res) => {
  const { gname, gimage, gstatus } = req.body;
  try {
    const data = await adminModel.findOne({});
    const datas = data.game.findIndex((item) => item._id.equals(req.params.id));

    let uploadUrl = null;
    if (req.file) {
      let upload = await cloudinary.v2.uploader.upload(req?.file?.path, {
        folder: "ludo",
      });
      uploadUrl = upload.secure_url;
    }
    if (datas !== -1) {
      // Updating the found game content
      data.game[datas].gname = gname;
      data.game[datas].gimage = uploadUrl;
      data.game[datas].gstatus = gstatus;
      await data.save(); // Save the changes back to the database
    }
    res.status(200).send({
      success: true,
      message: "update game successfully",
      data,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
// game admin view
export const gameAdminView = async (req, res, next) => {
  try {
    const admin = await adminModel.findOne({});
    const data = admin.game.find((item) => item._id.equals(req.params.id));

    if (!data) {
      return next("Invalid game id", 400);
    }
    res.status(200).send({
      success: true,
      message: "update game successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// game admin delete
export const gameAdminDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await adminModel.findOne({});
    const data = admin.game.findIndex((item) => item._id.equals(id));

    if (data === -1) {
      return next("Invalid game id", 400);
    }
    admin.game.splice(data, 1); // Remove the game from the game array
    await admin.save(); // Save the changes back to the database

    res.status(200).send({
      success: true,
      message: "delete game successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};



export const penalty = async (req, res) => {
  const { money, type } = req.body

  try {

    if (type == "penalty") {
      const data = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { money: -money } // Increment 'money' and decrement 'earning'
        },
        { new: true }
      );


      const user = await userModel.findById(req.params.id);
      await transactionHistoryModel.create({
        phone: user.phone,
        amount: money,
        type: "penalty",
        closeBalance: user.money,
        status: 0,
      });

      return res.status(200).json({
        success: true,
        message: "penalty successfully",
        data,
      });
    }
    if (type == "add") {
      const data = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { money: money } // Increment 'money' and decrement 'earning'
        },
        { new: true }
      );
      const users = await userModel.findById(req.params.id);
      await transactionHistoryModel.create({
        phone: users.phone,
        amount: money,
        type: "add money",
        closeBalance: users.money,
        status: 0,
      });

      return res.status(200).json({
        success: true,
        message: "add money successfully",
        data,
      });
    }


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in server",
      error,
    });
  }
};
