import React, { useState } from 'react'
import { FaUser, FaRegMoneyBillAlt } from 'react-icons/fa';
import { BsBank2 } from "react-icons/bs";
import upi from './Assets/upi_logo_icon_169316.webp'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, withdrawal } from '../store/reducer/authReducer';
import { useNavigate } from 'react-router';

const Upi = () => {
  const { successMessage ,loader} = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    upi: '',
    amount: ''
  });
const dispatch=useDispatch()
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit=()=>{
  dispatch(withdrawal(formData)).then((res)=>{
    alert(res.payload.message) 
    if(res.payload.success){
      dispatch(getUser());
navigate("/")
    }
  })
}

  return (
    <div className="mt-[70px]">
       <div className="p-4 max-w-md mx-auto bg-card text-card-foreground rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">Withdraw through</h2>
    <div className="flex items-center justify-between p-3 bg-[#f7f7f7] text-secondary-foreground rounded-lg mb-4">
      <div className="flex items-center">
      <img src={upi} alt="UPI logo" className="mr-4 w-[50px] rounded-full " />
        <div className="">
          <p className="font-semibold">Withdraw through UPI</p>
          <p className="text-sm text-muted-foreground">Minimum withdrawal amount ₹95</p>
        </div>
      </div>
      <button className="bg-[#19a0b8] text-white px-3 py-1 rounded-sm">Edit</button>
    </div>
    <form >
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
          placeholder='Please enter name'
          className="w-full p-2 border border-border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center mb-2 text-muted-foreground">
          <BsBank2 size={20} className="mr-2"/>
          UPI ID
        </label>
        <input
          type="text"
          name="upi"
          value={formData.upi}
          onChange={handleChange}
          placeholder='Please enter upi'
          className="w-full p-2 border border-border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center mb-2 text-muted-foreground">
          <FaRegMoneyBillAlt size={20} className="mr-2" />
          Amount
        </label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-lg"
          placeholder="amount"
        />
      </div>
    </form>
      <button 
       disabled={loader?true:false} 
      onClick={()=>handleSubmit()} className="w-full bg-[#107d2c] text-white py-2 rounded-2xl">Withdraw</button>
  </div>
    </div>
  )
}

export default Upi
