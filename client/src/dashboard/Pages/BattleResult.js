import React, { useEffect } from 'react'
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { adminBattleResult, adminBattleView } from '../../store/reducer/adminReducer';
import Spinner from '../../Components/Spinner';
import { formatDate } from './FormateDate';

import { useNavigate } from 'react-router';

import { Link } from 'react-router-dom';


const BattleResult = () => {
  const navigate=useNavigate()
  const { battleResultData, loader } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(adminBattleResult())
  }, [dispatch, battleResultData?.length])

  const handleView = (id) => {
    dispatch(adminBattleView(id)).then((response)=>{
      if(response.payload.success){
        navigate(`/dashboard/battle-control/${id}`)    
      }else{
        alert(response.payload.message)
      }
    })
  }
  return (
   <>
   {loader?(
    <Spinner/>
   ):(
<div className="p-0 m-0 w-[100%]">
<div className="container mx-auto px-4 sm:px-0">
<div className="py-2">
 <div className="flex justify-between">
   <h2 className="text-2xl font-semibold leading-tight">Battle Result</h2>
 </div>

 <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
   <table className=" leading-normal w-[100%]">
     <thead>
       <tr>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           #
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Battle ID
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Admin Commision
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Entry Fee
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Winning Price
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Room Code
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Ludo Type
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Battle Create
         </th>
         <th className="px-5 py-3 border border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Action
         </th>
       </tr>
     </thead>
     <tbody>
       {Array.isArray(battleResultData) && battleResultData?.map((battle, index) => (
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
               <p className="text-gray-900 whitespace-no-wrap">{battle.battleId}</p>
             </div>
           </td>
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
             <p className="text-blue-500 whitespace-no-wrap">{battle.recieve-battle.amount}</p>
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
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
             <p className="text-gray-900 whitespace-no-wrap">{formatDate(battle.createdAt)}</p>
           </td>
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">

             <button className="bg-[#4ad9ec] text-white hover:bg-red-900 flex items-center p-2 rounded-sm" onClick={()=>handleView(battle?._id)}>
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

export default BattleResult
