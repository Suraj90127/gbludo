import React, { useEffect } from 'react'
import img from './Assets/notransactionhistory (1).png'
import { useDispatch, useSelector } from 'react-redux';
import { getReferralCommission } from '../store/reducer/authReducer';
import { formatDate } from '../dashboard/Pages/FormateDate';

const History = () => {
  const { referralCommissions } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReferralCommission());
  }, [dispatch]);

  return (
    <>
      {Array.isArray(referralCommissions) && referralCommissions.length > 0 ? (
        <div>
          {referralCommissions.forEach((transaction, index) => (
            <div key={index} className="flex justify-between items-center border-b p-2">
               <div className="text-center">
                <div className="text-gray-600 font-semibold text-[0.8rem]">{formatDate(transaction.createdAt)}</div>
              </div>
              <div className="flex-1 mx-4">
                <div className="text-black text-[0.8rem] font-semibold">{transaction.phone}</div>
                <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.inviteBy}</div>
              </div>
              <div className="">
                <span className={`text-[0.8rem] text-green-500`}>+₹{transaction.amount}</span>
                <p className="text-[gray] text-[0.8rem] text-center">Balance</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col mt-[70px]">
          <img src={img} alt="" className="h-[200px] w-[200px]" />
          <h2 className="font-bold text-[1.2rem]">No Referral yet!</h2>
          <p className="text-[0.8rem]">Seems like you haven’t done any activity yet</p>
        </div>
      )}
    </>
  )
}

export default History