import React, { useEffect, useState } from "react";
import { FaUser, FaRegMoneyBillAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import bank from "./Assets/Bank-PNG-File.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser, withdrawal } from "../store/reducer/authReducer";
import { useNavigate } from "react-router";

const Bank = () => {
  const { successMessage, errorMessage } = useSelector((state) => state.auth);
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    accountNo: "",
    ifsc: "",
    amount: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(withdrawal(formData)).then((res)=>{
      alert(res.payload.message) 
      if(res.payload.success){
        dispatch(getUser());
navigate("/")
      }
    });
  };

  useEffect(() => {
 
  }, [successMessage, errorMessage]);

  return (
    <div className="mt-[70px]">
      <div className="p-4 max-w-md mx-auto bg-card text-card-foreground rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Withdraw through</h2>
        <div className="flex items-center justify-between p-3 bg-[#f7f7f7] text-secondary-foreground rounded-lg mb-4">
          <div className="flex items-center">
            <img
              src={bank}
              alt="UPI logo"
              className="mr-4 w-[50px] rounded-full "
            />
            <div className="">
              <h3 className="font-semibold text-[1.1rem]">Bank Transfer</h3>
              <p className="text-[0.7rem] text-[#f3cd23]">
                Minimum withdrawal amount ₹300
              </p>
              <p className="text-[0.7rem] text-[#f13a22]">
                Direct Bank Transaction will take 1-2 hours
              </p>
            </div>
          </div>
          <button className="bg-[#19a0b8] text-white px-3 py-1 rounded-sm">
            Edit
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="flex items-center mb-2 text-muted-foreground">
              <FaUser size={20} className="mr-2" />
              Account holder name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Please enter name"
              className="w-full p-2 border border-border rounded-lg"
              defaultValue=""
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2 text-muted-foreground">
              <BsBank2 size={20} className="mr-2" />
              Account Number
            </label>
            <input
              type="text"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              placeholder="Please enter account"
              className="w-full p-2 border border-border rounded-lg"
              defaultValue=""
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2 text-muted-foreground">
              <BsBank2 size={20} className="mr-2" />
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Please enter ifsc"
              className="w-full p-2 border border-border rounded-lg"
              defaultValue=""
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2 text-muted-foreground">
              <FaRegMoneyBillAlt size={20} className="mr-2" />
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Please enter amount"
              className="w-full p-2 border border-border rounded-lg"
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#107d2c] text-white py-2 rounded-2xl"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Bank;
