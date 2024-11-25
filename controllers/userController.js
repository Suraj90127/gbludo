import kycModel from "../models/kycModel.js";
import transactionHistoryModel from "../models/transactionHistoryModel.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import paymentModel from "../models/paymentModel.js";
import withdrawalModel from "../models/withdrawalModel.js";
import cloudinary from "cloudinary";
import axios from "axios";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import referModel from "../models/referModel.js";
import betModel from "../models/betModel.js";
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters[randomIndex];
  }
  return referralCode;
}
function generateUserId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters[randomIndex];
  }
  return referralCode;
}

// export const loginUser = async (req, res, next) => {
//   const randomString = generateRandomString(8);
//   const code = generateReferralCode();
//   const { phone, password, invite } = req.body;

//   console.log("object,", phone, password);
//   try {
//     if (!phone || !password) {
//       return next(new ErrorHandler("please enter phone and password", 404));
//     }
//     const user = await userModel.findOne({ phone });
//     const data = await adminModel.findOne({});

//     let referralCommission = 0;
//     let signUpBonus = 0;
//     if (data != null) {
//       referralCommission = data?.referralCommission;
//       signUpBonus = data?.signUpBonus;
//     }

//     let invites = "0";
//     if (invite == null) {
//       invites = "ADMIN1";
//     } else {
//       invites = invite;
//     }
//     const invitesData = await userModel.findOne({ code: invites });

//     if (user.otp != otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid otp",
//       });
//     }

//     if (user.status == "0") {
//       if (invitesData === null) {
//         return res.status(400).json({
//           success: false,
//           message: "invite code is not valid",
//           invitesData,
//         });
//       }
//       const newUser = await userModel.findOneAndUpdate(
//         { phone },
//         {
//           otp,
//           phone,
//           money: signUpBonus,
//           invite: invites,
//           name: randomString,
//           code,
//           status: "active",
//         }
//       );

//       await newUser.getJWTToken();

//       return res.status(200).json({
//         success: true,
//         message: "User registered successfully",
//         user: newUser,
//       });
//     }

//     if (user.status == "de-active") {
//       return res.status(400).send({
//         success: false,
//         message: "Your account is blocked",
//       });
//     }

//     if (user) {
//       await user.getJWTToken();
//     }

//     res.status(201).send({
//       success: true,
//       message: "login successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in Login",
//       error,
//     });
//   }
// };

export const loginUser = async (req, res, next) => {
  const randomString = generateRandomString(8);
  const code = generateReferralCode();
  const { phone, password, invite } = req.body;

  try {
    if (!phone || !password) {
      return next(new ErrorHandler("Please enter phone and password", 404));
    }

    // Find user by phone
    let user = await userModel.findOne({ phone }).select("+password");
    const data = await adminModel.findOne({});

    // Initialize referralCommission and signUpBonus
    let referralCommission = 0;
    let signUpBonus = 0;
    if (data != null) {
      referralCommission = data?.referralCommission;
      signUpBonus = data?.signUpBonus;
    }

    // Check if invite is provided, otherwise default to "ADMIN1"
    let invites = invite || "ADMIN1";
    const invitesData = await userModel.findOne({ code: invites });

    // console.log("invitesData", invitesData);

    // If user does not exist, create a new user
    if (!user) {
      if (invitesData === null) {
        return res.status(400).json({
          success: false,
          message: "Invite code is not valid",
        });
      }

      // Create a new user with the provided phone and password
      user = new userModel({
        phone,
        password,
        money: signUpBonus,
        invite: invites,
        name: randomString,
        code,
        status: "active",
      });

      // Save the new user
      await user.save();

      // Generate JWT token for the new user
      const token = await user.getJWTToken();

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user,
        token,
      });
    }

    // If user exists, verify the password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Check if the user is blocked
    if (user.status === "de-active") {
      return res.status(400).send({
        success: false,
        message: "Your account is blocked",
      });
    }

    // Generate JWT token for the existing user
    const token = await user.getJWTToken();

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const sendOtp = async (req, res) => {
  // Generate a 6-digit random OTP
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // Define the fields that will be sent in the POST request
    const fields = {
      sender_id: "139", // Sender ID, usually your user ID
      variables_values: otp, // OTP value to be sent
      numbers: phone, // Recipient phone number
    };

    // Make the POST request using axios
    const response = await axios.post(
      "https://ninzasms.in.net/auth/send_sms.php",
      fields,
      {
        headers: {
          authorization: "1395a34fc99b2cf54b7f9d669733b166b3a",
          accept: "*/*",
          "cache-control": "no-cache",
          "content-type": "application/json",
        },
        timeout: 30000, // Timeout for the request in milliseconds
      }
    );

    const responseData = response.data;

    // Check if the message was sent successfully
    if (responseData.status === 1 && responseData.msg === "Message Sent") {
      // If the message was sent successfully, update the user's OTP in the database

      const users = await userModel.findOne({ phone });
      const user = await userModel.findOneAndUpdate({ phone }, { otp: otp });
      if (users === null) {
        const newUser = await userModel.create({
          userId: generateUserId(),
          otp,
          phone,
        });
      }
      res
        .status(200)
        .json({ status: 1, message: "OTP sent successfully", user: user });
    } else {
      // If the message was not sent successfully, return the response message
      res
        .status(500)
        .json({ status: 0, msg: "Failed to send OTP", response: responseData });
    }
  } catch (error) {
    // If there was an error, print it
    res.status(500).json({ status: 0, msg: `Error: ${error.message}` });
  }
};

export const isLoggedIn = (req, res, next) => {
  if (
    req.session.userId &&
    activeSessions[req.session.userId] === req.sessionID
  ) {
    return next();
  }
};

/// Get user details
export const getUserDetails = async (req, res, next) => {
  try {
    // Find the user by ID
    let user = await userModel.findById(req.user._id);

    // Check if cashwon is negative and update it to 0 if necessary
    if (user && user.cashwon < 0) {
      await userModel.findByIdAndUpdate(
        req.user._id,
        { $set: { cashwon: 0 } }, // Set cashwon to 0
        { new: true } // Ensure the updated document is returned
      );

      // Fetch the updated user document after the update
      user = await userModel.findById(req.user._id);
    }
    const invitesData = await userModel.findOne({ invite: user.code });
    let refercount = 0;
    if (invitesData !== null) {
      refercount = await userModel.countDocuments({ invite: user.code });
    }
    // Return the user details
    return res.status(200).send({
      success: true,
      message: "User details found successfully",
      user,
      refercount,
    });
  } catch (error) {
    // Handle errors
    res.status(500).send({
      success: false,
      message: "Error in getting user details",
      error,
    });
  }
};

// update user profileexport const updateUserProfile = async (req, res) => {
export const updateUserProfile = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { name },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validations are run on the update
      }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user profile",
      error,
    });
  }
};

export const withdrawal = async (req, res) => {
  const { name, upi, ifsc, accountNo, amount } = req.body;
  const user = await userModel.findById(req.user._id);
  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //   const recharge = await paymentModel.findOne({ phone: user.phone });
    //   if (!recharge) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Payment record not found",
    //     });
    //   }

    const kycs = await kycModel.findOne({ phone: user.phone });

    if (kycs == null || kycs == undefined) {
      return res.status(201).json({
        success: false,
        message: "Please complete kyc",
      });
    }

    if (kycs.status !== 1) {
      return res.status(201).json({
        success: false,
        message: "Please complete kyc",
      });
    }

    if (user.money - user.cashwon < amount) {
      return res.status(400).json({
        success: false,
        message: "The total bet is not enough to fulfill the request",
      });
    }

    if (amount <= 94) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount 95",
      });
    }

    if (Number(amount) > user.money) {
      return res.status(400).json({
        success: false,
        message: "Your balance is not enough",
      });
    }

    let data;
    let updatedMoney = user.money > 0 ? user.money - amount : 0;

    if (upi) {
      data = await withdrawalModel.create({
        name,
        upi,
        amount,
        phone: user.phone,
      });
    } else {
      data = await withdrawalModel.create({
        name,
        ifsc,
        accountNo,
        amount,
        phone: user.phone,
      });
    }

    user.money = updatedMoney;
    await user.save();

    await transactionHistoryModel.create({
      phone: user.phone,
      amount,
      type: "Withdrawal",
      closeBalance: updatedMoney,
      status: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Withdrawal successful",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const withdrawalHistory = async (req, res) => {
  try {
    // const user = await userModel.findById(req.user.id);
    const user = await userModel.findById(req.user._id);

    const data = await withdrawalModel.find({ phone: user.phone });
    res.status(200).json({
      success: true,
      message: "withdraw history successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in server",
      error,
    });
  }
};

export const transactionHistorys = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    // Ensure the user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find history using the user's phone and status not equal to 0
    const data = await transactionHistoryModel.find({
      phone: user.phone,
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

export const kyc = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  // Ensure the user is found
  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find history using the user's phone and status not equal to 0
    const kycs = await kycModel.find({
      phone: user.phone,
    });

    if (kycs?.length > 0) {
      return res.status(404).json({
        success: false,
        message: "kyc already submitted",
      });
    }

    if (req.files) {
      let upload1 = await cloudinary.v2.uploader.upload(
        req.files.image1[0].path,
        {
          folder: "ludo",
        }
      );

      let upload2 = await cloudinary.v2.uploader.upload(
        req.files.image2[0].path,
        {
          folder: "ludo",
        }
      );

      const data = await kycModel.create({
        phone: user.phone,
        orderid: user.userId,
        image1: upload1.secure_url,
        image2: upload2.secure_url,
      });

      return res.status(201).json({
        success: true,
        message: "kyc submitted successfully",
        data,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getKyc = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    // Ensure the user is found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find history using the user's phone and status not equal to 0
    const data = await kycModel.findOne({
      phone: user.phone,
    });
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

export const getReferralCommission = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const data = await referModel.find({
      phone: user.phone,
    });
    res.status(200).json({
      success: true,
      message: "referral commission successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in server",
      error,
    });
  }
};

export const referralCommissionTransfer = async (req, res) => {
  const { money } = req.body;
  try {
    if (Number(money) < 95) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount 95",
      });
    }

    const user = await userModel.findById(req.user._id);

    if (user.earning <= money) {
      return res.status(400).json({
        success: false,
        message: "earning money is not enough",
      });
    }

    const data = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { money: money, earning: -money }, // Increment 'money' and decrement 'earning'
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Redeem commission successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in server",
      error,
    });
  }
};
