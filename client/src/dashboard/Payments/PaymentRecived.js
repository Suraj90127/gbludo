import React, { useEffect } from 'react'
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import { adminRechargeAll } from '../../store/reducer/adminReducer';
import { formatDate } from '../Pages/FormateDate';

const PaymentRecived = () => {
  const { rechargeAllData, loader } = useSelector((state) => state.admin);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(adminRechargeAll())
  }, [dispatch, rechargeAllData?.length])

  const filteredData = rechargeAllData?.filter(item => item.status === 1);
  return (
    <>
    {loader?(
<Spinner/>

    ):(
      <div className="p-0 m-0 w-[100%]">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="py-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Payment Recived</h2>
          </div>

          <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
            <table className=" leading-normal w-[100%]">
              <thead>
                <tr>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Create
                  </th>
                  <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData.map((battle, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <div className="flex items-center">
                        {/* <FaSword className="mr-2" /> */}
                        <p className="text-gray-900 whitespace-no-wrap">{battle.orderid}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <p className="text-blue-500 whitespace-no-wrap">{battle.orderid}</p>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">{battle.phone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <div className="flex items-center">
                        <FaMoneyBillWave className="mr-2 text-[green] text-[1.3rem]" />
                        <p className="text-gray-900 whitespace-no-wrap">{battle.amount}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <div className="flex items-center">
                        <p className={`text-gray-900 whitespace-no-wrap ${battle.status==1?"text-green-500":"text-red-500"}`}>{battle.status==1?"Success":"Pending"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <p className="text-gray-900 whitespace-no-wrap">{formatDate(battle.createdAt)}</p>
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                      <Link to="/pay-detail"> <button className="bg-[#4ad9ec] text-white hover:bg-red-900 flex items-center p-2 rounded-sm">
                        View
                      </button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-end xs:justify-between">
         <span className="text-xs xs:text-[15px] text-gray-900">Showing 1 to 4 of 4 entries</span>
         <div className="inline-flex mt-2 xs:mt-0">
           <button className="text-[15px] bg-blue-600 text-white font-semibold py-2 px-4 rounded-l">
             Previous
           </button>
           &nbsp; 
           <button className="text-[15px] bg-blue-600 text-white font-semibold py-2 px-4 rounded-r">
             1
           </button>
           &nbsp; 
           <button className="text-[15px] bg-blue-600 text-white font-semibold py-2 px-4 rounded-r">
             Next
           </button>
         </div>
       </div> */}
          </div>
        </div>
      </div>
    </div>
    )}
    
    </>
  )
}

export default PaymentRecived
