import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { rechargeHistory } from '../store/reducer/paymentReducer';
import { formatDate } from '../dashboard/Pages/FormateDate';
import { withdrawalHistory } from '../store/reducer/authReducer';


const WithdrawHistory = () => {
    const {withdrawalHistoryData}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(withdrawalHistory())
    },[withdrawalHistoryData?.length])
  return (
    <div className=" flex mt-[60px] pt-2 justify-center">
    <div className="w-full mx-auto bg-white shadow-md rounded-lg">
    <h2 className='text-xl font-semibold text-center mb-2'>Withdrawal History</h2>
        <hr />
      {Array.isArray(withdrawalHistoryData) && withdrawalHistoryData.map((transaction, index) => (
        <div key={index} className="flex justify-between items-center border-b p-2">
          <div className="text-center">
            {/* <div className="text-gray-600 font-semibold text-[0.8rem]">{transaction.date}</div> */}
            <div className="text-gray-400 text-[0.8rem]">{formatDate(transaction.createdAt)}</div>
          </div>
          <div className="flex-1 mx-4">
            <div className="text-black text-[0.8rem] font-semibold">{transaction.phone}</div>
            <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.orderid}</div>
          </div>
          <div className="" >
            <p className={`text-[gray] text-[0.8rem] text-center ${transaction.status==1?"text-green-500":transaction.status==2?"text-red-500":"text-orange-300"}`}>{transaction.status==1?"Success":transaction.status==2?"Failed":"Pending"}</p>
            <span className="text-[gray] text-[0.8rem] "><span className=" text-[0.8rem] ">₹</span>{transaction.amount}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default WithdrawHistory
