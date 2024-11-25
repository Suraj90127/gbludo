import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  adminKycAll, adminSuccessKyc } from '../../store/reducer/adminReducer';

const Allkyc = () => {
    const dispatch = useDispatch()
    const {allkycData} = useSelector(state=>state.admin)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleView = (id) => {
    dispatch(adminSuccessKyc(id)).then((res)=>{
      if(res.payload.success){
        navigate(`/dashboard/kyc-detail/${id}`)
      }else{
        alert(res.payload.message)
      }
      
    })
  }

      const filteredData = allkycData?.filter(entry => 
        entry?.phone?.toString().includes(searchTerm)
      );
      useEffect(()=>{
        dispatch(adminKycAll())
      },[])
  return (
    <div className='w-[100%]'>
       <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">KYC</h1> */}
      <h2 className="text-xl font-semibold mb-2">All KYC</h2>
      <div className="flex justify-between mb-4">
        <div>
        <input 
            type="text" 
            placeholder="Search" 
            className="border border-zinc-300 rounded p-1" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto sm:w-[310px] md:w-[100%]">
        <table className="min-w-full border border-zinc-300">
          <thead className="bg-zinc-100">
            <tr>
              <th className="border border-zinc-300 p-2">#</th>
              <th className="border border-zinc-300 p-2">User ID</th>
              <th className="border border-zinc-300 p-2">Phone</th>
              <th className="border border-zinc-300 p-2">Document Name</th>
              <th className="border border-zinc-300 p-2">Document Number</th>
              <th className="border border-zinc-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {Array.isArray(allkycData) && filteredData.map((entry, index) => (
              <tr key={entry.id}>
               <td className="border border-zinc-300 p-2">{index + 1}</td>
                <td className="border border-zinc-300 p-2">{entry.orderid}</td>
                <td className="border border-zinc-300 p-2">{entry.phone}</td>
                <td className="border border-zinc-300 p-2">
                  <img src={entry.image1} alt="" className='w-[200px] h-[100px]' />
                </td>
                <td className="border border-zinc-300 p-2">
                  <img src={entry.image2} alt="" className='w-[200px] h-[100px]'/>
                </td>
                <td className="border border-zinc-300 p-2">
                 <Link onClick={()=>handleView(entry._id)}> <button className="bg-[#550ad6] text-white px-3 py-1 rounded-sm">View</button></Link>
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

export default Allkyc
