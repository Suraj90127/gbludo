import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner';

import { adminNewBattle, adminNewBattleDelete } from '../../store/reducer/adminReducer';
import { formatDate } from './FormateDate';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const data = [
    {
      id: 1,
      battleId: '172121084599',
      creator: '7JAYM681',
      entryFee: 100,
      winningPrice: 195,
      roomCode: 'wait for room code',
      ludoType: 'Ludo Classic',
      createDate: '17 / 07 / 2024 15:37:25',
    },
    {
      id: 2,
      battleId: '172120355534',
      creator: 'sd',
      entryFee: 550,
      winningPrice: 1073,
      roomCode: 'wait for room code',
      ludoType: 'Ludo Classic 2',
      createDate: '17 / 07 / 2024 13:35:55',
    },
    {
      id: 3,
      battleId: '172090412147',
      creator: 'sd',
      entryFee: 550,
      winningPrice: 1073,
      roomCode: 'wait for room code',
      ludoType: 'Ludo Classic 2',
      createDate: '14 / 07 / 2024 11:25:21',
    },
    {
      id: 4,
      battleId: '172068601894',
      creator: 'MG5WA227',
      entryFee: 100,
      winningPrice: 195,
      roomCode: 'wait for room code',
      ludoType: 'Ludo Classic',
      createDate: '11 / 07 / 2024 22:50:18',
    },
  ];
const NewBattle = () => {
  const {newBattleData,loader} =useSelector((state)=>state.admin)
const dispatch=useDispatch()

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
        dispatch(adminNewBattleDelete(id)).then(()=>{
          if (!loader) {
            dispatch(adminNewBattle())
          }
        })
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  }
  useEffect(()=>{
    if (!loader) {
      dispatch(adminNewBattle())
    }
    console.log('Type of newBattleData:', typeof newBattleData);
    console.log('Is newBattleData an array:', Array.isArray(newBattleData));
  },[dispatch,newBattleData?.length])
  
  return (
   <>
   {loader?(
<Spinner/>

   ):(

<div className="p-0 m-0 w-[100%]">
<div className="container mx-auto px-4 sm:px-0">
<div className="py-2">
 <div className="flex justify-between">
   <h2 className="text-2xl font-semibold leading-tight">New Battles</h2>
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
           Battle Creator
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
       {Array.isArray(newBattleData) && newBattleData?.map((battle, index) => (
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
               <p className="text-gray-900 whitespace-no-wrap">{battle.room==null?"Wai for room code":battle.room}</p>
             </div>
           </td>
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
             <p className="text-gray-900 whitespace-no-wrap">{battle?.type}</p>
           </td>
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
             <p className="text-gray-900 whitespace-no-wrap">{formatDate(battle.createdAt)}</p>
           </td>
           <td className="px-5 py-5 border border-gray-200 bg-white text-[15px]">
             <button className="bg-red-600 text-white hover:bg-red-900 flex items-center p-2 rounded-md"
             onClick={() => handleDelete(battle._id)}>
               <FaTrashAlt />
               DELETE
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

export default NewBattle
