import React, { Fragment, useEffect, useState } from 'react'
import { FaRegImage, FaTrophy, FaSadTear, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { adminGetKyc, adminPenalty, adminViewUser, adminViewUserBank, adminViewUserBetHistory, adminViewUserTransactionHistory } from '../../store/reducer/adminReducer';
import { formatDate } from './FormateDate';
import { IoMdClose } from "react-icons/io";
const PlayerView = () => {

  const { adminviewUserdata, userKyc, adminviewUserBankdata, userBetHistory, adminUserTransactionHistorys,loader } = useSelector((state) => state.admin)
  const [money, setMoney] = useState(Number)
  const [moneys, setMoneys] = useState(Number)
  const { id } = useParams()
  const dispatch = useDispatch()

  const [isZoomed, setIsZoomed] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleImageClick2 = () => {
    setIsZoomed2(true);
  };

  const handleCloseClick = () => {
    setIsZoomed(false);
    setIsZoomed2(false);
  };



  useEffect(() => {
    dispatch(adminViewUser(id))
    dispatch(adminViewUserBank(id))
    dispatch(adminViewUserBetHistory(id))
    dispatch(adminViewUserTransactionHistory(id))
    dispatch(adminGetKyc(id))
  }, [])

  var moneyss = 0;
  if (money !== 0 || moneys !== 0) {
    moneyss = Number(money) + Number(moneys);
  }



  const penaltySubmit = () => {
    const type = "penalty"
    dispatch(adminPenalty({ id, moneyss, type })).then((res) => {
      alert(res.payload.message)
      dispatch(adminViewUser(id))
    })
  }
  const addMoneySubmit = (moneys) => {
    const type = "add"
    dispatch(adminPenalty({ id, moneyss, type })).then((res) => {
      alert(res.payload.message)
      dispatch(adminViewUser(id))
    })
  }

  useEffect(() => { }, [moneyss])

  return (
    <div className='w-full'>
      <div className="flex items-center flex-wrap sm:w-[100%] md:w-[100%] justify-between p-2 bg-white rounded-lg shadow-md">
        <div className="">
          <FaUser className="text-primary text-5xl rounded-full border-2 border-primary" />
          <div className="text-primary font-semibold">{adminviewUserdata?.name}</div>
          <div className="text-muted-foreground">{adminviewUserdata?.phone}</div>
        </div>
        <div className="flex text-center gap-5">
          <div className="text-green-500">{adminviewUserdata?.earning.toFixed(2)}</div>
          <FaTrophy className="text-green-500 text-2xl" />
          <div className="text-red-500">{adminviewUserdata?.money?.toFixed(2)}</div>
          <FaSadTear className="text-red-500 text-2xl" />
        </div>
        <div className={`text-red-500 ${userKyc?.status == 0 ? "text-orange-500" : userKyc?.status == 1 ? "text-green-500" : "text-red-500"}`}>{userKyc?.status == 0 ? "Pending" : userKyc?.status == 1 ? "Verified" : "Rejected"}</div>
      </div>

      <div className="flex flex-col md:flex-row justify-between  space-y-6 md:space-y-0">
        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">KYC Documents Details</h2>
          <table className="min-w-full border border-zinc-300">
            <tbody>

              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Front Side Image</td>
                <td className="border border-zinc-300 p-3">
                  {userKyc?.image1 ? (
                    <>
                      <img src={userKyc?.image1} alt="" className='w-[200px] h-[100px]' onClick={handleImageClick} />

                      {isZoomed && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={userKyc?.image1}
                              alt=""
                              className="max-w-full max-h-full"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
                              onClick={handleCloseClick}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <FaRegImage className="w-8 h-8 text-gray-500" />
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Back Side Image</td>
                <td className="border border-zinc-300 p-3">
                  {userKyc?.image2 ? (
                    <>
                    <img src={userKyc?.image2} alt="" className='w-[200px] h-[100px]' onClick={handleImageClick2}/>
                    {isZoomed2 && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={userKyc?.image2}
                              alt=""
                              className="max-w-full max-h-full"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
                              onClick={handleCloseClick}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <FaRegImage className="w-8 h-8 text-gray-500" />
                  )}
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Verify Document Status</td>
                <td className={`border border-zinc-300 p-3 ${userKyc?.status == 0 ? "text-orange-500" : userKyc?.status == 1 ? "text-green-500" : "text-red-500"}`}>{userKyc?.status == 0 ? "Pending" : userKyc?.status == 1 ? "Verified" : "Rejected"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">Bank Account Details</h2>
          <table className="min-w-full border border-zinc-300">
            <tbody>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">UPI - Account Holder Name</td>
                <td className="border border-zinc-300 p-3">{adminviewUserBankdata?.name}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">UPI - Id</td>
                <td className="border border-zinc-300 p-3">{adminviewUserBankdata?.upi}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - Holder Name</td>
                <td className="border border-zinc-300 p-3">{adminviewUserBankdata?.name}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - Account Number</td>
                <td className="border border-zinc-300 p-3">{adminviewUserBankdata?.accountNo}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - IFSC Code</td>
                <td className="border border-zinc-300 p-3">{adminviewUserBankdata?.ifsc}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Created at</td>
                <td className="border border-zinc-300 p-3">{formatDate(adminviewUserBankdata?.createdAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">Other Details</h2>
          <table className="min-w-full border border-zinc-300">
            <tbody>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Phone</td>
                <td className="border border-zinc-300 p-3">{adminviewUserdata?.phone}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Wallet</td>
                <td className="border border-zinc-300 p-3">💰 {adminviewUserdata?.money}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Referral Code</td>
                <td className="border border-zinc-300 p-3">{adminviewUserdata?.code}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Referred By</td>
                <td className="border border-zinc-300 p-3">updated_referred_by</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Created at</td>
                <td className="border border-zinc-300 p-3">{formatDate(adminviewUserdata?.createAt)}</td>
              </tr>
            </tbody>
          </table>
          <button className="mt-4 bg-[#36b9cc] text-white hover:bg-secondary/80 p-2 rounded-lg transition-colors">
            Update Now
          </button>
        </div>
      </div>

      <div className='flex p-3 bg-white rounded-lg gap-3'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex gap-5'>
            <p className='text-[1rem] text-[gray] font-semibold'>Penalty</p>
            <input type='number' value={money} className='border border-black p-1'
              onChange={(e) => setMoney(e.target.value)}

              
            />
          </div>
          <button className='px-3 py-2 bg-[#4e73df] text-white w-fit rounded-sm mt-1'
           disabled={loader?true:false} 
          onClick={penaltySubmit}>
            Submit
          </button>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex gap-5'>
            <p className='text-[1rem] text-[gray] font-semibold'>Add money</p>
            <input type='number' value={moneys} className='border border-black p-1'
              onChange={(e) => setMoneys(e.target.value)}
            />
          </div>
          <button className='px-3 mt-1 py-2 bg-[#4e73df] text-white w-fit rounded-sm'
           disabled={loader?true:false} 
            onClick={addMoneySubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="p-4 bg-card rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="border border-border p-2">#</th>
                <th className="border border-border p-2">Order ID</th>
                <th className="border border-border p-2">Date</th>
                <th className="border border-border p-2">Amount</th>
                <th className="border border-border p-2">Type</th>
                <th className="border border-border p-2">Remark</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {Array.isArray(adminUserTransactionHistorys) && adminUserTransactionHistorys?.length ? (
                Array.isArray(adminUserTransactionHistorys) && adminUserTransactionHistorys.map((transaction, i) => (
                  <tr key={i}>
                    <td className="border border-border p-2">{i + 1}</td>
                    <td className="border border-border p-2">{transaction.orderid}</td>
                    <td className="border border-border p-2">{formatDate(transaction.createdAt)}</td>

                    <td className="border border-border p-2">{transaction.amount}</td>
                    <td className="border border-border p-2">{transaction.type}</td>
                    <td className={`border border-border p-2 ${transaction.status == 0 ? "text-orange-500" : transaction.status == 1 ? "text-green-500" : "text-red-500"}`}>{transaction.status == 0 ? "Pending" : transaction.status == 1 ? "Success" : "Failed"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-border p-2" colSpan="7">No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h2 className="text-lg font-semibold text-foreground mt-8">Games History</h2>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="border border-border p-2">#</th>
                <th className="border border-border p-2">Date</th>
                <th className="border border-border p-2">Bet Amount</th>
                <th className="border border-border p-2">Winning Amount</th>
                {/* <th className="border border-border p-2">Total</th> */}
                <th className="border border-border p-2">Type</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {Array.isArray(userBetHistory) && userBetHistory?.length ? (
                Array.isArray(userBetHistory) && userBetHistory.map((game, i) => (
                  <Fragment key={i}>
                    {game.phone == adminviewUserdata?.phone ? (
                      <tr key={i}>
                        <td className="border border-border p-2">{game.battleId}</td>
                        <td className="border border-border p-2">{formatDate(game.createdAt)}</td>
                        <td className="border border-border p-2">{game.amount}</td>
                        <td className="border border-border p-2">{game.getAmount}</td>
                        {/* <td className="border border-border p-2">{game.total}</td> */}
                        <td className={`border border-border p-2 ${game.getAmount != 0 ? "text-green-500" : game.acceptedBy[0]?.get != 0 ? "text-red-500" : "text-orange-500"}`}>{game.getAmount != 0 ? "Win" : game.acceptedBy[0]?.get != 0 ? "Loss" : "Pending"}</td>
                      </tr>
                    ) : (
                      <tr key={i}>
                        <td className="border border-border p-2">{game.battleId}</td>
                        <td className="border border-border p-2">{formatDate(game.createdAt)}</td>
                        <td className="border border-border p-2">{game.amount}</td>
                        <td className="border border-border p-2">{game.acceptedBy[0]?.get}</td>
                        {/* <td className="border border-border p-2">{game.total}</td> */}
                        <td className={`border border-border p-2 ${game.getAmount != 0 ? "text-green-500" : game.acceptedBy[0]?.get != 0 ? "text-red-500" : "text-orange-500"}`}>{game.getAmount != 0 ? "Win" : game.acceptedBy[0]?.get != 0 ? "Loss" : "Pending"}</td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td className="border border-border p-2" colSpan="7">No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PlayerView
