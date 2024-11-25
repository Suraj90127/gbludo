import React, { useCallback, useEffect, useState } from 'react'
import { transactionHistory, withdrawalHistory } from '../store/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../dashboard/Pages/FormateDate';
import { rechargeHistory } from '../store/reducer/paymentReducer';
import { betHistory } from '../store/reducer/gameReducer';
import { format, parseISO } from 'date-fns';
import img1 from './Assets/ludo.jpg'

const Transaction = () => {
  const dispatch = useDispatch()
  const { transactionHistoryData, withdrawalHistoryData, userDetail } = useSelector(state => state.auth)
  const { rechargeHistorys } = useSelector((state) => state.payment)
  const { bethitorys } = useSelector((state) => state.bet);
  const [tabs, setTabs] = useState("Game")


  const getData = useCallback(() => {
    dispatch(rechargeHistory())
    dispatch(betHistory())
    dispatch(withdrawalHistory())
    dispatch(transactionHistory())
  }, [dispatch])

  useEffect(() => {
    getData()

  }, [dispatch, getData]);


 
  return (
    <>

      <div className='flex mt-[60px]  pt-2 justify-between items-center mx-5'>
        {/* <button className={`${tabs === "All" ? "bg-[#3a86ff] text-white " : ""} flex  border   text-sm font-medium w-20 items-center text-center justify-center py-1 rounded-full`} onClick={() => setTabs("All")}>  All</button> */}
        <button className={`${tabs == "Deposit" ? "bg-[#3a86ff] text-white " : ""} flex  border  text-sm font-medium w-20 items-center text-center justify-center py-1 rounded-full`} onClick={() => setTabs("Deposit")}>Deposit</button>
        <button className={`${tabs == "Withdraw" ? "bg-[#3a86ff] text-white " : ""} flex  border   text-sm font-medium w-20 items-center text-center justify-center py-1 rounded-full`} onClick={() => setTabs("Withdraw")}>Withdraw</button>
        <button className={`${tabs == "Game" ? "bg-[#3a86ff] text-white " : ""} flex  border   text-sm font-medium w-20 items-center text-center justify-center py-1 rounded-full`} onClick={() => setTabs("Game")}>Game</button>
      </div>

      <div className=" flex  justify-center">
        <div className="w-full mx-auto bg-white shadow-md rounded-lg">
          {/* {(tabs === "All") && (
            Array.isArray(transactionHistoryData) && transactionHistoryData.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b p-2">
                <div className="text-center">
                  <div className="text-gray-600 font-semibold text-[0.8rem]">{formatDate(transaction.createdAt)}</div>
             
                </div>
                <div className="flex-1 mx-4">
                  <div className="text-black text-[0.8rem] font-semibold">{transaction.type} {userDetail?.name} </div>
                  <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.orderid}</div>
                </div>
                <div className="" >
                  <span className={`text-[gray] font-semibold text-[0.8rem] ${transaction.status == 1 ? "text-green-500" : "text-red-500"}`}>{transaction.status == 1 ? "(+) " : "(-) "}₹{transaction.amount}</span>
                  <p className="text-[gray] text-[0.8rem] text-center">Balance</p>
                </div>
              </div>
            ))
          )} */}

          {(tabs === "Deposit") && (
            Array.isArray(rechargeHistorys) && rechargeHistorys.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b p-2">
                <div className="text-center">
                  {/* <div className="text-gray-600 font-semibold text-[0.8rem]">{transaction.date}</div> */}
                  <div className="text-gray-400 text-[0.8rem]">{formatDate(transaction.createdAt)}</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="text-black text-[0.8rem] font-semibold">Deposit {userDetail?.name}</div>
                  <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.orderid}</div>
                </div>
                <div className="" >
                  <p className={`text-[gray] text-[0.8rem] text-center ${transaction.status == 1 ? "text-green-500" : transaction.status == 2 ? "text-red-500 mr-[12px]" : "text-orange-300"}`}>{transaction.status == 1 ? "Success" : transaction.status == 2 ? "Failed" : "Pending"}</p>
                  <span className="text-[gray] text-[0.8rem] "><span className=" text-[0.8rem] ">₹</span>{transaction.amount}</span>
                </div>
              </div>
            ))
          )}
          {(tabs === "Withdraw") && (
            Array.isArray(withdrawalHistoryData) && withdrawalHistoryData.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b p-2">
                <div className="text-center">
                  {/* <div className="text-gray-600 font-semibold text-[0.8rem]">{transaction.date}</div> */}
                  <div className="text-gray-400 text-[0.8rem]">{formatDate(transaction.createdAt)}</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="text-black text-[0.8rem] font-semibold">Withdrawal {userDetail?.name}</div>
                  <div className="text-gray-500 text-[0.6rem]">Order ID: {transaction.orderid}</div>
                </div>
                <div className="" >
                  <p className={`text-[gray] text-[0.8rem] text-center ${transaction.status == 1 ? "text-green-500" : transaction.status == 2 ? "text-red-500" : "text-orange-300"}`}>{transaction.status == 1 ? "Success" : transaction.status == 2 ? "Failed" : "Pending"}</p>
                  <span className="text-[gray] text-[0.8rem] "><span className=" text-[0.8rem] ">₹</span>{transaction.amount}</span>
                </div>
              </div>
            ))
          )}
          {(tabs === "Game") && (
            Array.isArray(bethitorys) && bethitorys?.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b p-2">
                <div className="text-center">
                  <div className="text-gray-600 font-semibold text-[0.8rem]">{format(parseISO(transaction.createdAt), 'dd MMM').toUpperCase()}</div>
                  <div className="text-gray-400 text-[0.8rem]">{format(parseISO(transaction.createdAt), 'hh:mm a').toUpperCase()}</div>
                </div>
                <div className="ml-1">
                  <img src={img1} className="w-[40px]" alt="" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="text-black text-[0.8rem] font-semibold capitalize">
                    
                    {transaction.phone === userDetail.phone
                      ? `${transaction.betstatus =="1"? transaction.status:"Bet" }`  
                      : `${ transaction.betstatus =="1"?   transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.status :"Bet" }` }

{/* {transaction.phone === userDetail.phone ?
(

  (transaction.getAmount ==0 ? "Loss" : "Win")
)
 :
  (transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.get ==0 ? "Loss" : "Win")} */}

</div>
                  <div className="text-gray-500 text-[0.6rem]">Room Code: {transaction.room}</div>
                </div>


                {
                  ((transaction?.phone === userDetail?.phone) ||
                    (transaction?.acceptedBy?.some(acc => acc.phone === userDetail?.phone))) && (
                    <div className="text-end">
                      <span className={`text-[gray] font-semibold text-[0.8rem] ${transaction.phone === userDetail.phone ? (transaction.getAmount == 0 ? "text-red-500" : " text-green-500") : (transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.get == 0 ? "text-red-500" : "text-green-500")}`}>

                        {transaction.phone === userDetail.phone ? (transaction.getAmount ==0 ? "(-)" : "(+)") : (transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.get ==0 ? "(-)" : "(+)")}
                        {
                          transaction.phone === userDetail.phone
                            ? `${transaction?.getAmount==0? transaction.amount:transaction?.getAmount -transaction.amount}`  // Show transaction amount if phone matches
                            : `${transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.get === 0 ? transaction.amount : transaction.acceptedBy?.find(acc => acc.phone === userDetail.phone)?.get -transaction.amount}`  // Show 'get' from acceptedBy if phone matches there
                        }
                      </span>
                      <p className="text-gray-600 text-[0.66rem] text-center">Balance</p>
                    </div>
                  )
                }



              </div>
            ))
          )}

        </div>
      </div>
    </>
  )
}

export default Transaction
