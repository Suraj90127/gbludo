import React, { useEffect, useState } from 'react';
import img from './Assets/global-battleIconWhiteStroke.png'
import money from './Assets/global-rupeeIcon.png'
import vs from './Assets/versus.png'
import profile from './Assets/Avatar2.png'
import icon from './Assets/nogamehistory.png'
import img1 from './Assets/17187106486.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { betHistory } from '../store/reducer/gameReducer';
import { format, parseISO } from 'date-fns';


const GameHistory = () => {

  const { bethitorys } = useSelector((state) => state.bet);
 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(betHistory())
  }, [dispatch]);


  return (

    <>

<div className="flex justify-center items-center flex-col mt-[70px]">
  {bethitorys && bethitorys?.length === 0 ? (
    <div>
      <img src={icon} alt="" className="h-[200px] w-[200px]" />
      <h2 className="font-bold text-[1.2rem]">No Games Played yet!</h2>
      <p className="text-[0.8rem]">Seems like you haven’t played any game yet, play now to win!</p>
    </div>
  ) : (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg">
      {Array.isArray(bethitorys) && bethitorys?.map((transaction, index) => (
        <div key={index} className="flex justify-between items-center border-b p-2">
          <div className="text-center">
            <div className="text-gray-600 font-semibold text-[0.8rem]">{format(parseISO(transaction.createdAt), 'dd MMM').toUpperCase()}</div>
            <div className="text-gray-400 text-[0.8rem]">{format(parseISO(transaction.createdAt), 'hh:mm a').toUpperCase()}</div>
          </div>
          <div className="ml-1">
            <img src={img1} className="w-[40px]" alt="" />
          </div>
          <div className="flex-1 mx-4">
            <div className="text-black text-[0.8rem] font-semibold">{"Win"}</div>
            <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction._id}</div>
          </div>
          <div className="text-end">
            <span className="text-gray-600 text-[0.8rem]">
              <span className="text-green-500 text-[0.8rem]">(+)</span>
              {transaction.amount}
            </span>
            <p className="text-gray-600 text-[0.66rem] text-center">Closing Balance</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </>
  )
}

export default GameHistory
