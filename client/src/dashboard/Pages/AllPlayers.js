import React, { useEffect, useState } from 'react';
import { FaCheck, FaClock, FaTrophy } from 'react-icons/fa';
import { MdBlock } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { adminAllUsers, adminUpdateUserStatus, adminViewUser, adminViewUserTransaction } from '../../store/reducer/adminReducer';
import Spinner from '../../Components/Spinner';
import { formatDate } from './FormateDate';
import { Link, useNavigate } from 'react-router-dom';

const AllPages = () => {
const {allUserData,loader}=useSelector((state)=>state.admin)
const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleApprove = (id) => {
  const status="active"
      Swal.fire({
      title: 'Unblock',
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

  const handleBlock = (id) => {
    console.log("fff",id)
    const status="de-active"
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




  useEffect(() => {
  dispatch(adminAllUsers())
  }, [dispatch,allUserData?.length]);

const handleViewUserTransaction = (id) => {
  dispatch(adminViewUser(id)).then((res)=>{
    if(res.payload.success){
      navigate(`/dashboard/player-view/${id}`)
    }else{
      alert(res.payload.message)
    }
  })
}

  return (

    <>
    {loader ==false? (
    <div className="p-0 m-0 w-[100%] ">
      <div className="p-2 w-[100%]">
        <h2 className="text-2xl font-semibold mb-4">Players</h2>
        <div className="mb-4">
          <p className="text-[#4e73df] ">ALL PLAYERS</p>
        </div>
        <div className="overflow-x-auto sm:w-[330px] md:w-[100%]">
          <table className="min-w-full border border-input">
            <thead>
              <tr className="bg-muted">
                <th className="border border-input p-2">#</th>
                <th className="border border-input p-2">User ID</th>
                <th className="border border-input p-2">Mobile No</th>
                <th className="border border-input p-2">Wallet</th>
                <th className="border border-input p-2">Referral Code</th>
                <th className="border border-input p-2">Total Games Played</th>
                <th className="border border-input p-2">Joined At</th>
                <th className="border border-input p-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.isArray(allUserData) && allUserData.map((player,i) => (
                <tr key={i}>
                  <td className="border border-input p-2">{i}</td>
                  <td className="border border-input p-2 text-primary hover:underline">
                    <Link to="/dashboard/player-view/:id">{player.userId}</Link>
                  </td>
                  <td className="border border-input p-2">{player.phone}</td>
                  <td className="border border-input p-2">{player.money}</td>
                  <td className="border border-input p-2">{player.code}</td>
                  <td className="border border-input p-2 flex items-center">
                    <FaTrophy className="mr-2 text-amber-400" />add
                  </td>
                  <td className="border border-input p-2">{ formatDate(player.createAt)}</td>
                  <td className="border border-input p-2">
                    <button
                      className="bg-green-500 text-white p-1 rounded mr-2"
                      onClick={() => handleApprove(player._id)}
                    >
                      <FaCheck />
                    </button>
                    <button className="bg-blue-500 text-white p-1 rounded" onClick={() => handleViewUserTransaction(player._id)}>
                      <FaClock />
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded ml-2"
                      onClick={() => handleBlock(player._id)}
                    >
                      <MdBlock />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
):(
  <Spinner/>
)}  
    </>
  );
}

export default AllPages;
