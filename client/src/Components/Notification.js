import React from 'react'
import icon from './Assets/nogamehistory.png'

const transactions = [
  {
    date: "04 Jul",
    time: "04:02 AM",
    description: "Chips added By Admin Added in Wallet",
    orderId: "order_9491883395",
    amount: 10000,
  },
  {
    date: "04 Jul",
    time: "04:02 AM",
    description: "Chips added By Admin Added in Wallet",
    orderId: "order_9491883395",
    amount: 10000,
  },
];
const Notification = () => {
  return (
    <div className=" flex mt-[60px] pt-2 justify-center">
    <div className="w-full mx-auto bg-white shadow-md rounded-lg">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex justify-between items-center border-b p-2">
          <div className="text-center">
            <div className="text-gray-600 font-semibold text-[0.8rem]">{transaction.date}</div>
            <div className="text-gray-400 text-[0.8rem]">{transaction.time}</div>
          </div>
          <div className="flex-1 mx-4">
            <div className="text-black text-[0.8rem] font-semibold">{transaction.description}</div>
            <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.orderId}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Notification
