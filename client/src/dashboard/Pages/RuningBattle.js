import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';

import { adminBattleView, adminNewBattleDelete, adminRunningBattle } from '../../store/reducer/adminReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { formatDate } from './FormateDate';
import Spinner from '../../Components/Spinner';
import { useNavigate } from 'react-router';


// import 'sweetalert/dist/sweetalert.css';


const RuningBattle = () => {
  const navigate = useNavigate()
  const { runningBattleData, loader } = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete',
      text: `Are you sure you want delete `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminNewBattleDelete(id)).then(() => {
          if (!loader) {
            dispatch(adminRunningBattle())
          }
        })
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  }
const handleView = (id) => {
  dispatch(adminBattleView(id)).then((response)=>{
    if(response.payload.success){
      navigate(`/dashboard/bet-details/${id}`)    
    }else{
      alert(response.payload.message)
    }
  })
}
  useEffect(() => {
    dispatch(adminRunningBattle())
  }, [dispatch, runningBattleData?.length])
  return (
  <>
  {loader?(
<Spinner/>
  ):(
    <div className="p-0 m-0 w-[100%]">
    <div className="container mx-auto px-4 sm:px-0">
      <div className="py-2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Runing Battles</h2>
        </div>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className=" leading-normal w-[100%]">
            <thead>
              <tr>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Battle Create
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Battle ID
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Entry Creator
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Battle Fee
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Wining Prize
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Room Code
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Battle Type
                </th>
                <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(runningBattleData) && runningBattleData.map((battle, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <p className="text-gray-900 whitespace-no-wrap">{formatDate(battle.createdAt)}</p>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <div className="flex items-center">
                      {/* <FaSword className="mr-2" /> */}
                      <p className="text-gray-900 whitespace-no-wrap">{battle.battleId}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <p className="text-blue-500 whitespace-no-wrap">{battle.name}</p>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2 text-[green] text-[1.3rem]" />
                      <p className="text-gray-900 whitespace-no-wrap">{battle.amount}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2 text-[green] text-[1.3rem]" />
                      <p className="text-gray-900 whitespace-no-wrap">{battle.recieve}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <div className="flex items-center">
                      <FaHome className="mr-2 text-[#00ccff] text-[1.3rem]" />
                      <p className="text-gray-900 whitespace-no-wrap">{battle.room}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
                    <p className="text-gray-900 whitespace-no-wrap">{battle.type}</p>
                  </td>
                  <td className="px-5 py-5 border border-gray-200 bg-white text-[15px] flex items-center">
                    <button className="bg-red-600 text-white hover:bg-red-900 flex items-center p-2 rounded-md"
                      onClick={() => handleDelete(battle._id)}>
                      <FaTrashAlt />
                      DELETE
                    </button>
                    <button className="bg-[#4ad9ec] ms-2 text-white hover:bg-red-900 flex items-center p-2 rounded-sm" onClick={()=>handleView(battle._id)}>
               View
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
  )}
  </>
  )
}

export default RuningBattle
