import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';
import { FaCheck, FaClock, FaTrophy } from 'react-icons/fa';
import { MdOutlineCancel } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { adminRecharge, adminRechargeApprove, adminRechargeReject } from '../../store/reducer/adminReducer';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from './FormateDate';
import Swal from 'sweetalert2';

const Deposit = () => {
 
  const dispatch=useDispatch()
  const {rechargeData,loader} =useSelector((state)=>state.admin)
  const handleApprove = (id) => {   
    Swal.fire({
      title: 'Recharge confirm',
      text: `Are you sure you want  Recharge confirm`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(adminRechargeApprove(id)).then(()=>{
          dispatch(adminRecharge())
          window.location.reload();
        })
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Recharge reject',
      text: `Are you sure you want  Recharge reject`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(adminRechargeReject(id)).then(()=>{
          dispatch(adminRecharge())
          window.location.reload();
        })
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  };


  useEffect(()=>{
    dispatch(adminRecharge())
  },[dispatch])
  return (
    <div className="w-[100%]">
      <div className="p-0 m-0">
        <div className="container mx-auto px-4 sm:px-0 ">
          <div className="py-2 ">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold leading-tight">Deposit Request</h2>
            </div>
            <div className="overflow-x-auto sm:w-[300px] md:w-[100%] mt-2">
              <table className=" leading-normal w-[100%]">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     UTR
                    </th>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Via
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
                  {Array.isArray(rechargeData) && rechargeData.map((battle, index) => (
                    <tr key={battle.id}>
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
                        <p className="text-blue-500 whitespace-no-wrap">{battle.utr}</p>
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
                          <p className="text-gray-900 whitespace-no-wrap">{battle.type}</p>
                        </div>
                      </td>
                      <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                        <div className="flex items-center">
                          <p className="text-gray-900 whitespace-no-wrap">{battle.status==0?"Active":"De-active"}</p>
                        </div>
                      </td>
                      <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                        <p className="text-gray-900 whitespace-no-wrap">{formatDate(battle.createdAt)}</p>
                      </td>
                      <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                        <button
                          className="bg-green-500 text-white p-1 rounded mr-2"
                          disabled={loader?true:false} 
                          onClick={() => handleApprove(battle._id)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="bg-red-500 text-white p-1 rounded ml-2"
                          disabled={loader?true:false} 
                          onClick={() => handleReject(battle._id)}
                        >
                          <MdOutlineCancel />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
        
        </div>
      </div>
    </div>
  )
}

export default Deposit
