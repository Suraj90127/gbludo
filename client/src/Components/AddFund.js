import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getrecharge, recharge } from "../store/reducer/paymentReducer";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const AddFund = () => {
  const [amount, setAmount] = useState(100);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClick = (value) => {
    if (value >= 10 && value <= 100000) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    if (amount < 100) {
      alert("Minimum amount is 100");
    } else {
      dispatch(recharge(amount)).then((res) => {
        if (res.payload.success) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);

          // Set the cookie with the specified expiration date
          Cookies.set("transactionsId", res.payload.transactionsId, {
            secure: true,
            sameSite: "None",
            expires: expirationDate,
          });

          // window.open(res.payload?.data?.data?.payment_url, "_blank");
          navigate("/recharge/pay");
        }
      });
    }
  };

  useEffect(() => {}, [dispatch, amount]);

  return (
    <div className="mt-[80px]">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 ">
        <h2 className="text-lg font-semibold">Choose amount to add</h2>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-zinc-700"
          >
            Enter Amount
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 border-b-1 bg-[white]  text-[gray] text-[1.5rem] font-bold">
              ₹
            </span>
            <input
              type="number"
              id="amount"
              className=" ps-2 border border-blue-100 outline-none border-b-1 flex-1 h-[40px] block w-full text-[gray] text-[1.5rem] font-bold"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Min: 10, Max: 100000
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => handleButtonClick(100)}
            className="bg-[#fafafa] text-[gray] text-[1.5rem] font-bold hover:bg-white p-4 rounded-lg border border-border"
          >
            ₹ 100
          </button>
          <button
            onClick={() => handleButtonClick(250)}
            className="bg-[#fafafa] text-[gray] text-[1.5rem] font-bold hover:bg-white p-4 rounded-lg border border-border"
          >
            ₹ 250
          </button>
          <button
            onClick={() => handleButtonClick(500)}
            className="bg-[#fafafa] text-[gray] text-[1.5rem] font-bold hover:bg-white p-4 rounded-lg border border-border"
          >
            ₹ 500
          </button>
          <button
            onClick={() => handleButtonClick(1000)}
            className="bg-[#fafafa] text-[gray] text-[1.5rem] font-bold hover:bg-white p-4 rounded-lg border border-border"
          >
            ₹ 1000
          </button>
        </div>
        <button
          className="bg-[#3a86ff] text-white font-bold hover:bg-primary/80 w-full py-3 rounded-lg mt-6"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default AddFund;
