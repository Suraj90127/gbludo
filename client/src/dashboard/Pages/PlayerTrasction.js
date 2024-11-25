import React, { useEffect } from 'react'
import profile from '../../Components/Assets/Avatar2.png'
import { useDispatch, useSelector } from 'react-redux';
import { adminViewUserTransaction } from '../../store/reducer/adminReducer';
import { useParams } from 'react-router';

const PlayerTrasction = () => {
    const transactions = [
        {
          id: 1,
          orderId: 'order_6089668409',
          day: 19,
          month: 'Jul',
          year: 2024,
          time: '04:45 PM',
          amount: 1500,
          balance: 3000,
        },
        {
          id: 2,
          orderId: 'order_5283894717',
          day: 19,
          month: 'Jul',
          year: 2024,
          time: '10:22 AM',
          amount: 1500,
          balance: 1500,
        },
        // Add more transactions as needed
      ];
const dispatch=useDispatch()
const {adminUserTransaction}=useSelector((state)=>state.admin)

const {id}=useParams()
      useEffect(()=>{
        dispatch(adminViewUserTransaction(id))
      },[id])
  return (
    <div className="w-[100%]">
       <div className="p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 md:mr-6">Transaction History of 9H2YT922</h1>
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 rounded-full" src={profile} alt="User Avatar" />
          <div className="text-right">
            <p className="text-lg font-medium">9H2YT922</p>
            <p className="text-muted-foreground">9813334053</p>
            <p className="text-primary flex items-center">
              3000
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-muted pt-4">
        <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
        <div className="flex flex-col md:flex-row items-center mb-4">
          
          <div className="ml-auto">
            <label htmlFor="search" className="mr-2">Search:</label>
            <input id="search" type="text" className="border border-input rounded p-1" />
          </div>
        </div>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className="min-w-full border-collapse border border-muted">
            <thead className="bg-muted">
              <tr>
                <th className="border border-muted p-2">#</th>
                <th className="border border-muted p-2">Order ID</th>
                <th className="border border-muted p-2">Day</th>
                <th className="border border-muted p-2">Month</th>
                <th className="border border-muted p-2">Year</th>
                <th className="border border-muted p-2">Paying Time</th>
                <th className="border border-muted p-2">Amount</th>
                <th className="border border-muted p-2">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="bg-card">
                  <td className="border border-muted p-2">{transaction.id}</td>
                  <td className="border border-muted p-2">{transaction.orderId}</td>
                  <td className="border border-muted p-2">{transaction.day}</td>
                  <td className="border border-muted p-2">{transaction.month}</td>
                  <td className="border border-muted p-2">{transaction.year}</td>
                  <td className="border border-muted p-2">{transaction.time}</td>
                  <td className="border border-muted p-2 ">
                    {transaction.amount}
                  </td>
                  <td className="border border-muted p-2 ">
                    {transaction.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PlayerTrasction
