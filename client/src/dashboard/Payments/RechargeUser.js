import React, { useEffect, useState } from 'react';
import { FaTrophy, FaCheck, FaClock } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { adminRechargeAll } from '../../store/reducer/adminReducer';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../Pages/FormateDate';


const RechargeUser = () => {
    const [searchTerm, setSearchTerm] = useState();
    const {rechargeAllData} =useSelector((state)=>state.admin)
    const [filteredPlayers, setFilteredPlayers] = useState([]);
  
  console.log("object",filteredPlayers)

    const dispatch=useDispatch()
    const handleSearch = () => {
        const filtered = filteredPlayers.filter(player =>
          player.phone && player.phone.toString().includes(searchTerm)
        );
        setFilteredPlayers(filtered);
      };
  useEffect(()=>{
    if(Array.isArray(rechargeAllData)){
      setFilteredPlayers(rechargeAllData)
    }
    dispatch(adminRechargeAll())
  },[dispatch,rechargeAllData?.length])
  return (
    <div className="p-0 m-0 w-[100%]">
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Recharge Money to User Wallet</h2>
      <div className="mb-4">
        <input
          type="number"
          className="border p-2"
          placeholder="Search User"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={handleSearch}>Search User...</button>
      </div>
   
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
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
            <tbody>
              {Array.isArray(filteredPlayers) && filteredPlayers.map((player,i) => (
                <tr key={i}>
                  <td className="border border-input p-2">{i+1}</td>
                  <td className="border border-input p-2 text-primary hover:underline">
                    <a href="#">{player.userId}</a>
                  </td>
                  <td className="border border-input p-2">{player.phone}</td>
                  <td className="border border-input p-2">{player.amount}</td>
                  <td className="border border-input p-2">{player.code}</td>
                  <td className="border border-input p-2 flex items-center">
                    <FaTrophy className="mr-2 text-[1.3rem] text-[#f8f853]" />{"add"}
                  </td>
                  <td className="border border-input p-2">{formatDate(player.createdAt)}</td>
                  <td className={`border border-input p-2 ${player.status==0?"text-yellow-500":player.status==2?"text-red-500":"text-green-500"}`}>
                    {player.status==0?"Pending":player.status==2?"Rejected":"Approved"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </div>
  </div>
  )
}

export default RechargeUser
