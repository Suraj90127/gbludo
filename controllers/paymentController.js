import paymentModel from "../models/paymentModel.js";
import transactionHistoryModel from "../models/transactionHistoryModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();
app.use(cookieParser());

function generateUniqueTransactionId() {
  const timestamp = Date.now().toString(); // Get the current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0"); // Generate a random 6-digit number
  return timestamp.slice(-4) + randomNum; // Combine last 4 digits of timestamp and random 6 digits
}

// export const recharge = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     console.log("amount", amount);

//     const user = await userModel.findById(req.user._id);
//     if (amount <= 49) {
//       return res.status(400).json({
//         success: false,
//         message: "Minimum amount 50",
//       });
//     }

//     const orderData = {
//       key: "9c66f914-c91d-47e0-a7fb-7bf7eb8b46de", // Use your actual API key
//       client_txn_id: `${generateUniqueTransactionId()}` || "1234567899",
//       amount: `${amount}` || "100",
//       p_info: req.body.p_info || "Product Name",
//       customer_name: req.body.customer_name || `${user.name}`,
//       customer_email: req.body.customer_email || "jondoe@gmail.com",
//       customer_mobile: req.body.customer_mobile || `${user.phone}`,
//       redirect_url: req.body.redirect_url || "https://ludobar.in",
//       udf1: req.body.udf1 || "user defined field 1",
//       udf2: req.body.udf2 || "user defined field 2",
//       udf3: req.body.udf3 || "user defined field 3",
//     };

//     axios
//       .post("https://api.ekqr.in/api/create_order", orderData, {
//         headers: {
//           "Content-Type": "application/json",
//           // Add any additional headers here, e.g., Authorization, if required
//         },
//       })
//       .then((response) => {
//         paymentModel.create({
//           amount,
//           phone: user.phone,
//           transactionsId: orderData.client_txn_id,
//         });

//         // httpOnly: true, // Cookie cannot be accessed by client-side scripts
//         // secure: false, // Set to true if you're using HTTPS

//         return res.status(200).json({
//           success: true,
//           message: "order created successfully",
//           data: response.data,
//           transactionsId: `${orderData.client_txn_id}`,
//         });

//         // Send back the response data to the client
//       })
//       .catch((error) => {
//         // Handle the error and send the error response back to the client
//         console.error("Error creating order:", error);
//         res.status(500).json({
//           message: "Failed to create order",
//           error: error.message,
//         });
//       });
//   } catch (error) {
//     console.log("object", error);
//     return res.status(500).json({
//       success: true,
//       message: "internal server error",
//     });
//   }
// };

export const recharge = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await userModel.findById(req.user._id);

    if (amount <= 99) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount 100",
      });
    }

    const data = await paymentModel.create({
      amount,
      phone: user.phone,
    });
    res.status(200).json({
      success: true,
      message: "order created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};

const date = new Date();
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
export const geRecharge = async (req, res) => {
  // try {

  const {
    id, // UPI gateway transaction ID
    customer_vpa, // UPI ID from which payment is made
    amount, // Amount
    client_txn_id, // Client transaction ID set while creating order
    customer_name, // Customer name
    customer_email, // Customer email
    customer_mobile, // Customer mobile number
    p_info, // Product info set while creating order
    upi_txn_id, // UPI Transaction ID (UTR or Merchant App Transaction ID)
    status, // Status of the transaction (success or failure)
    remark, // Remark of transaction
    udf1, // User-defined field 1
    udf2, // User-defined field 2
    udf3, // User-defined field 3
    redirect_url, // Redirect URL added while creating the order
    txnAt, // Date of transaction
    createdAt, // Creation date of the transaction
  } = req.body;

  const orderData = {
    key: "53910bb1-aee1-4401-bb2b-e41c3e35f717", // Use your actual API key
    client_txn_id: client_txn_id,
    txn_date: formatDate(createdAt) || "27-02-2022",
  };

  const data = await paymentModel.findOne({ transactionsId: client_txn_id });

  axios
    .post("https://api.ekqr.in/api/check_order_status", orderData, {
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers here, e.g., Authorization, if required
      },
    })
    .then(async (response) => {
      // Add 'async' to the callback function

      if (response.data.data.status === "success") {
        console.log("datass", data._id);

        // Await the payment model update
        await paymentModel.findByIdAndUpdate(
          data._id,
          { status: 1 },
          { new: true } // If you don't want to create a new entry when no match is found
        );

        // Await the user model update
        await userModel.findOneAndUpdate(
          { phone: data.phone }, // Correctly specifying the filter
          {
            $inc: {
              money: response.data.data.amount,
              cashwon: response.data.data.amount,
            },
          }, // Incrementing both 'money' and 'cashwon' fields
          { new: true } // Return the updated document
        );

        const user = await userModel.findOne({ phone: data.phone }); // Await finding the user

        // Await transaction history creation
        await transactionHistoryModel.create({
          phone: user.phone,
          amount: response.data.data.amount,
          type: "Deposit",
          closeBalance: user.money,
          status: 1,
        });

        return res.status(200).json({
          success: true,
          message: "approve recharge successfully",
          data: response.data.data,
        });
      }
    })
    .catch((error) => {
      // Handle the error and send the error response back to the client
      console.error("Error creating order:", error);
      res.status(500).json({
        message: "Failed to create order",
        error: error.message,
      });
    });

  // } catch (error) {
  //   console.log("object",error)
  //   res.status(500).send({
  //     success: false,
  //     message: "Internal server error",
  //     error,
  //   });
  // }
};

export const getRechargeOrder = async (req, res) => {
  try {
    const { orderid } = req.cookies;
    const data = await paymentModel.findOne({ orderid: orderid });
    res.status(200).json({
      success: true,
      message: "get order successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};

export const submitUtr = async (req, res) => {
  const { orderid } = req.cookies;
  const { utr } = req.body;

  if (!orderid) {
    return res
      .status(400)
      .json({ message: "Order ID is missing from cookies." });
  }
  if (!utr) {
    return res
      .status(400)
      .json({ message: "UTR is missing from request body." });
  }

  // Check if the UTR is already stored
  const existingUtr = await paymentModel.findOne({ utr });
  if (existingUtr) {
    return res.status(400).json({ message: "UTR is already in use." });
  }
  // Find the document by orderid and update it
  const data = await paymentModel.findOneAndUpdate(
    { orderid }, // Query object to find the document by orderid
    { utr, status: 0 }, // Update object to set new values
    { new: true } // Options: Return the updated document
  );

  if (!data) {
    return res.status(404).json({ message: "Payment not found." });
  }

  const user = await userModel.findById(req.user._id);
  await transactionHistoryModel.create({
    phone: user.phone,
    amount: data.amount,
    type: "Deposit",
    closeBalance: user.money,
    status: 0,
  });
  res.status(200).json({
    success: true,
    message: "utr submited successfully",
    data,
  });

  try {
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};

export const getRechargeHistory = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const data = await paymentModel.find({ phone: user.phone });
    res.status(200).json({
      success: true,
      message: "recharge history successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
    console.log("eeeeeeeeee", error);
  }
};
