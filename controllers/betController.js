import adminModel from "../models/adminModel.js";
import betModel from "../models/betModel.js";
import referModel from "../models/referModel.js";
import transactionHistoryModel from "../models/transactionHistoryModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "cloudinary";



function generateUserId() {
  const characters = "0123456789";
  let battale = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    battale += characters[randomIndex];
  }
  return battale;
}

export const createBet = async (req, res) => {
  const { amount } = req.body;
  const user = await userModel.findById(req.user._id);
  try {

    const already = await betModel.findOne({
      $or: [
        { phone: user.phone, status: { $in: ["1"] } },
        { acceptedBy: { $elemMatch: { phone: user.phone, status: { $in: ["0", "1", ""] } } } }
      ]
    });

    if (already) {
      return res.status(400).json({
        success: false,
        message: "Please fill bet result",
      });
      // You can also send this message as a response or handle it as needed
    }


    if (Number(amount) <= 49) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount 50",
      });
    }
    if (Number(amount) > user.money) {
      return res.status(400).json({
        success: false,
        message: "Your balance is not enough",
      });
    }


    if (Number(amount) % 10 !== 0) {
      return res.status(400).json({
        success: false,
        message: "Please set the bet to a multiple of 10.",
      });
    }





    const money = Number(user.money) - (Number(amount))

    let cashwon

    if (user.cashwon < 0) {
      cashwon = 0
    } else {
      cashwon = Number(user.cashwon) - Number(amount)
    }

    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        money,
        cashwon
      },
      { new: true }
    );



    await transactionHistoryModel.create({
      phone: user.phone,
      amount,
      type: "Bet",
      closeBalance: user.money,
      status: 0,
    });


    const newBet = await betModel.create({
      battleId: generateUserId(),
      name: user.name,
      phone: user.phone,
      amount,
      recieve: amount * 1.95,
    });



    const admin = await adminModel.findOne({});
    await adminModel.findByIdAndUpdate(
      admin._id,
      { $inc: { money: amount * 0.05 } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "create bet successful",
      newBet,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const listBets = async (req, res) => {
  try {
    const bets = await betModel.find({

      room: null,
      betstatus: "0",
      acceptedBy: { $eq: [] }
    });

    // const bets = await betModel.find({ acceptedBy: { $size: 0 } });
    return res.status(200).json({
      success: true,
      message: "Show bets",
      bets,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const acceptBet = async (req, res) => {
  try {
    const { betId } = req.body;

    const user = await userModel.findById(req.user._id);
    const bet = await betModel.findById(betId);

    if (!bet) return res.status(404).send("Bet not found");
    if (bet.acceptedBy.length > 0)
      return res.status(400).send({
        success: false,
        message: "Bet already accepted",
      });

    if (isNaN(bet.amount) || isNaN(user.money)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bet amount or user money value",
      });
    }

    if (Number(bet.amount) > user.money) {
      return res.status(400).json({
        success: false,
        message: "Your balance is not enough",
      });
    }


    const already = await betModel.findOne({
      $or: [
        { phone: user.phone, status: "1" },
        { acceptedBy: { $elemMatch: { phone: user.phone, status: "0" } } }
      ]
    });

    if (already) {
      return res.status(400).json({
        success: false,
        message: "Please fill bet result",
      });
      // You can also send this message as a response or handle it as needed
    }


    const admin = await adminModel.findOne({});
    let commission = 0;
    if (admin != null) {
      commission = admin.battleCommission1;
    }

    // const money = user.money - (bet.amount - (bet.amount * commission) / 100);
    const money = user.money - bet.amount;

    if (isNaN(money)) {
      return res.status(400).json({
        success: false,
        message: "Calculation error, resulting money value is invalid",
        money: user.money,
        bet: bet.amount,
        admin: commission,
      });
    }

    let cashwon
    if (user.cashwon < 0) {
      cashwon = 0
    } else {
      cashwon = Number(user.cashwon) - Number(bet.amount)
    }


    await userModel.findByIdAndUpdate(req.user._id, { money,cashwon }, { new: true });

    // Check if `acceptedBy` array is empty
    if (bet.acceptedBy.length === 0) {
      // Push the new object if the array is empty

      bet.acceptedBy.push({
        name: user.name,
        phone: user.phone,
      });

      // Set the status to "1"
      bet.status = "1";

      // Save the updated document
      await bet.save();
    }


    await transactionHistoryModel.create({
      phone: user.phone,
      amount: bet.amount,
      type: "Bet",
      closeBalance: money, // Ensure this is the updated balance
      status: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Bet accepted",
      bet,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const acceptBetList = async (req, res) => {
  try {
    const bets = await betModel.find({
      $or: [
        { status: "1" },
        { acceptedBy: { $elemMatch: { status: { $in: ["0", "1", ""] } } } }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Accepted bets",
      bets,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const DeletBet = async (req, res) => {
  try {
    const { id } = req.params;
    const betid = await betModel.findById(id);
    await betModel.findByIdAndDelete(id);

    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { money: betid.amount },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "bet delete succesfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const playBet = async (req, res) => {
  try {
    const { id } = req.params;
    const bet = await betModel.findById(id);

    res.status(200).json({
      success: true,
      message: "get single bet succesfully",
      bet,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const setRoom = async (req, res) => {
  const { room } = req.body;
  const { id } = req.params;
  try {
    const rooms = await betModel.findByIdAndUpdate(
      id,
      { room }, // Ensure room is an object or the appropriate data type
      { new: true }
    );

    if (!rooms) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "room updated",
      rooms,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};



export const updateStatus = async (req, res) => {
    const { status, description } = req.body;
    const { id } = req.params;
    try {
      const user = await userModel.findById(req.user._id);
   
      const invitesData = await userModel.findOne({ code: user.invite });
  
      const data = await adminModel.findOne({});
  
      let referralCommission = 0;
      if (data != null) {
        referralCommission = data?.referralCommission;
  
      }
  
  
      let uploadUrl = null;
      if (req.file) {
        let upload = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "ludo",
        });
        uploadUrl = upload.secure_url;
      }
  
      const betid = await betModel.findById(id);
  
      if (user.phone == betid.phone) {
        const betids = await betModel.findOne({
          _id: id,
          status: { $in: ["0", "1", ""] },
        });
        if (!betids) {
          return res.status(400).json({
            success: false,
            message: "You already submitted the result",
          });
        }
        if (status == "win" && betids.acceptedBy[0].status == "loss") {
          const statuss = await betModel.findByIdAndUpdate(
            id,
            {
              status: status,
              description: description || uploadUrl,
              getAmount: betid.recieve,
              betstatus: "1",
            },
            { new: true }
          );
  
          await userModel.findByIdAndUpdate(
            req.user._id,
            {
              // $inc: { money: betid.recieve, earning: betid.recieve },
              $inc: { money: betid.recieve },
            },
            { new: true }
          );
  
  
          // refer commission
          if (invitesData != null) {
            await referModel.create({
              referid: generateUserId(),
              phone: invitesData.phone,
              invite: user.code,
              money: (betid.amount / 100) * Number(referralCommission),
           
              inviteBy: user.phone,
            });
            
            
            await userModel.findOneAndUpdate(
              { phone: invitesData.phone },
              { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
              { new: true }
            )
          }
  
          await transactionHistoryModel.create({
            phone: user.phone,
            amount: betid.recieve,
            type: "win",
            closeBalance: user.money + betid.recieve, // Assuming user.money is the balance before the increment
            status: 1,
          });
          await transactionHistoryModel.create({
            phone: betid.acceptedBy[0].phone,
            amount: betid.amount,
            type: "loss",
            closeBalance: 0,
            status: 2,
          });
  
          return res.status(201).json({
            success: true,
            message: "Status submitted successfully",
            statuss,
          });
        } else {
          const statuss = await betModel.findByIdAndUpdate(
            id,
            {
              status: status,
              description: description || uploadUrl,
            },
            { new: true }
          );
          // update result
          if (status == "loss" && betids.acceptedBy[0].status == "win") {
            await userModel.findOneAndUpdate(
              { phone: betids.acceptedBy[0].phone },
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
              closeBalance: 0, // Assuming user.money is the balance before the increment
              status: 2,
            });
            await transactionHistoryModel.create({
              phone: betid.acceptedBy[0].phone,
              amount: betid.recieve,
              type: "win",
              closeBalance: 0,
              status: 1,
            });

               // refer commission
          if (invitesData != null) {
            await referModel.create({
              referid: generateUserId(),
              phone: invitesData.phone,
              invite: user.code,
              money: (betid.amount / 100) * Number(referralCommission),
             
              inviteBy: user.phone,
            });
            
            
            await userModel.findOneAndUpdate(
              { phone: invitesData.phone },
              { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
              { new: true }
            )
          }
          
  
            betid.acceptedBy[0].get = betid.recieve;
            betid.betstatus = "1";
            await betid.save();
          }
          
          
         
  
          return res.status(201).json({
            success: true,
            message: "Status submitted successfully",
            statuss,
          });
        }
      } else {
        // second user
        const betids = await betModel.findOne({
          _id: id,
          "acceptedBy.0.status": { $in: ["0", "1"] },
        });
        if (!betids) {
          return res.status(400).json({
            success: false,
            message: "You already submitted the result",
          });
        }
        if (status == "win" && betids.status == "loss") {
          betid.acceptedBy[0].status = status;
          betid.acceptedBy[0].description = description || uploadUrl;
          betid.acceptedBy[0].get = betid.recieve;
          betid.betstatus = "1";
          betid.status = "loss";
          const statuss = await betid.save();
  
          await userModel.findByIdAndUpdate(
            req.user._id,
            {
              // $inc: { money: betid.recieve, earning: betid.recieve },
              $inc: { money: betid.recieve },
            },
            { new: true }
          );
  
          await transactionHistoryModel.create({
            phone: betid.acceptedBy[0].phone,
            amount: betid.recieve,
            type: "win",
            closeBalance: 0, // Assuming user.money is the balance before the increment
            status: 1,
          });
  
          await transactionHistoryModel.create({
            phone: betid.phone,
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
              invite: user.code,
              money: (betid.amount / 100) * Number(referralCommission),
  
              inviteBy: user.phone,
            });
            
                console.log("second",invitesData.phone )
                
            await userModel.findOneAndUpdate(
              { phone: invitesData.phone },
              { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
              { new: true }
            )
          }
  
          return res.status(201).json({
            success: true,
            message: "Status submitted successfully",
            statuss,
          });
        } else {
          betid.acceptedBy[0].status = status;
          betid.acceptedBy[0].description = description || uploadUrl;
          // betid.status = "win"; //0
          const statuss = await betid.save();
          if (status == "loss" && betid.status == "win") {
            await userModel.findOneAndUpdate(
              { phone: betid.phone },
              {
                //   $inc: { money: betid.recieve, earning: betid.recieve },
                $inc: { money: betid.recieve },
              },
              { new: true }
            );
            await transactionHistoryModel.create({
              phone: betid.phone,
              amount: betid.recieve,
              type: "win",
              closeBalance: 0, // Assuming user.money is the balance before the increment
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
              invite: user.code,
              money: (betid.amount / 100) * Number(referralCommission),
       
              inviteBy: user.phone,
            });
            
                console.log("second",invitesData.phone )
                
            await userModel.findOneAndUpdate(
              { phone: invitesData.phone },
              { $inc: { earning: (betid.amount / 100) * Number(referralCommission) } },
              { new: true }
            )
          }
          
  
            await betModel.findByIdAndUpdate(
              id,
              {
                getAmount: betid.recieve,
                betstatus: "1",
              },
              { new: true }
            );
            
          }
  
          return res.status(201).json({
            success: true,
            message: "Status submitted successfully",
            statuss,
          });
        }
      }
    } catch (error) {
        console.log("jijio",error)
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  };

export const betHistory = async (req, res) => {
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
    const historys = await betModel.find({
      $or: [
        { phone: user.phone },
        { acceptedBy: { $elemMatch: { phone: user.phone } } },
      ],
      // status: { $ne: 0 }
    });

    res.status(201).json({
      success: true,
      message: "History retrieved successfully",
      historys,
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
