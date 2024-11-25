import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recieveOrder, submitUtr } from "../store/reducer/paymentReducer";
import { adminSetting } from "../store/reducer/adminReducer";
// import qrcode1 from "./Assets/qrcode.jpeg "

const Pay = () => {
  const { rechargeData, successMessage, loader } = useSelector(
    (state) => state.payment
  );

  console.log("rechargeData", rechargeData);
  const { adminSettingData } = useSelector((state) => state.admin);
  const [utr, setUtr] = useState("");
  const [qrcode, setQrcode] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(submitUtr(utr)).then(() => {
      alert("submit successfully");
    });
  };
  useEffect(() => {
    dispatch(recieveOrder());
    dispatch(adminSetting()).then((res) => {
      setQrcode(res.payload.qrcode);
    });
  }, [dispatch, utr]);
  let upi = 0;
  if (Array.isArray(adminSettingData)) {
    upi = adminSettingData[0]?.upi;
  }

  const copyToClipCode = () => {
    navigator.clipboard
      .writeText(upi)
      .then(() => {
        alert("UPI copy successfull");
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <button className="text-blue-500 mb-4">&lt; Back</button>
          <h1 className="text-2xl font-semibold mb-6">UPI Information</h1>
          <div>
            <div className="bg-green-500 text-white text-center p-4 mb-6">
              <h2 className="text-xl">Payment Amount</h2>
              <p className="text-2xl font-bold">₹ {rechargeData?.amount}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg mb-2">Payment Via UPI</h3>
              <p className="mb-2">1. Copy UPI Information.</p>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={upi}
                  className="border p-2 flex-1 rounded-l-lg"
                />
                <button
                  className="bg-blue-500 text-white px-4 rounded-r-lg py-2"
                  onClick={() => copyToClipCode()}
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <img src={qrcode} alt="QR Code" className="w-52 h-52" />
            </div>
            <div className="mb-4">
              <p>
                2. Transfer the amount you want to recharge to us by UPI
                transfer.
              </p>
              <p>3. Please enter Ref No. to complete the recharge.</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="REF NO."
                className="border p-2 w-full rounded-lg"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Please enter the REF NO/Reference NO/UTR (12-digit number) of your
              transfer and we will finish your recharge as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;
