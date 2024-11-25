import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTrash, FaTrophy, FaClock, FaUser, FaMobileAlt, FaWallet } from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { adminBlockUser, adminUpdateUserStatus } from '../../store/reducer/adminReducer';
import Spinner from '../../Components/Spinner';
// import 'sweetalert/dist/sweetalert.css';

const BlockPlayers = () => {
  const {blockUsers, loader}=useSelector((state)=>state.admin)
  const dispatch= useDispatch()
 
  const handleBlock = (id) => {
    const status="active"
    Swal.fire({
      title: 'Block',
      text: `Are you sure you want  `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(adminUpdateUserStatus({id,status}))
      } else if (result.isDismissed) {
        console.log('Cancelled');
      }
    });
  };

 
 

  useEffect(()=>{
    dispatch(adminBlockUser())
  },[dispatch,blockUsers?.length])

  const formatDate = (dateString) => {
    const date = new Date(dateString);  
    const pad = (num) => num.toString().padStart(2, '0');  
    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1); // Months are zero-based
    const year = date.getUTCFullYear();
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
   <>
   {loader?(
    <Spinner/>
   ):(
     <div className="p-0 m-0 w-[100%]">
     <div className="p-2">
 <h2 className="text-2xl font-semibold mb-4">Blocked Players</h2>
 <div className="mb-4">
   <a href="#" className="text-primary hover:underline">ALL BLOCKED PLAYERS</a>
 </div>
 <div className="overflow-x-auto sm:w-[330px] md:w-[100%]">
   <table className="min-w-full border border-gray-300">
     <thead>
       <tr className="bg-gray-100">
         <th className="border border-gray-300 p-2">#</th>
         <th className="border border-gray-300 p-2">User ID</th>
         <th className="border border-gray-300 p-2">Mobile No</th>
         <th className="border border-gray-300 p-2">Wallet</th>
         <th className="border border-gray-300 p-2">Referral Code</th>
         <th className="border border-gray-300 p-2">Total Game Played</th>
         <th className="border border-gray-300 p-2">Joined At</th>
         <th className="border border-gray-300 p-2">Action</th>
       </tr>
     </thead>
     <tbody className='bg-white'>
       {Array.isArray(blockUsers) && blockUsers?.map((player,i) => (
         <tr key={i}>
           <td className="border border-gray-300 p-2">{i}</td>
           <td className="border border-gray-300 p-2 flex items-center">
             <FaUser className="mr-2" />
             <a href="#" className="text-primary hover:underline">{player.userId}</a>
           </td>
           <td className="border border-gray-300 p-2">
               <div className="flex items-center">
             <FaMobileAlt className="mr-2 " />{player.phone}
             </div>
           </td>
           <td className="border border-gray-300 p-2 ">
               <div className="flex items-center">
             <FaWallet className="mr-2 text-[#704a30]" />{player.money}
             </div>
           </td>
           <td className="border border-gray-300 p-2">{player.code}</td>
           <td className="border border-gray-300 p-2 ">
               <div className="flex items-center ">
             <FaTrophy className="mr-2 text-[#e2e22a]" />{"Add this"}
             </div>
           </td>
           <td className="border border-gray-300 p-2 ">
               <div className="flex items-center">
             <FaClock className="mr-2" />{formatDate(player.createAt)}
             </div>
           </td>
           <td className="border border-gray-300 p-2">
             <button className="bg-red-500 text-white px-2 py-1 rounded"
             onClick={() => handleBlock(player._id)}>
               Un-Block
             </button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
</div>

</div>
   )}
   
   </>
  )
}

export default BlockPlayers
