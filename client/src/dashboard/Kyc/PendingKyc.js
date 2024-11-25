import React, { useEffect, useState } from 'react';
import { adminApproveKyc, adminPendingKyc, adminRejectedKyc } from '../../store/reducer/adminReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

const PendingKyc = () => {
  const dispatch = useDispatch();
  const { userKycPending,loader } = useSelector((state) => state.admin);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);

 


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userKycPending?.filter(entry =>
    entry?.phone?.toString().includes(searchTerm)
  );
  const handleApprove = (id) => {
    dispatch(adminApproveKyc(id)).then(() => {
      dispatch(adminPendingKyc())
    })
  }
  const handleReject = (id) => {
    dispatch(adminRejectedKyc(id)).then(() => {
      dispatch(adminPendingKyc())
    })
  }

  // zoom
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
    dispatch(adminPendingKyc())
  }, [])

  return (
    <div className='w-[100%]'>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">KYC</h1>
        <h2 className="text-xl font-semibold mb-2">Pending KYC</h2>
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
              {Array.isArray(userKycPending) && filteredData.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="border border-zinc-300 p-2">{index + 1}</td>
                  <td className="border border-zinc-300 p-2">{entry.orderid}</td>
                  <td className="border border-zinc-300 p-2">{entry.phone}</td>
                  <td className="border border-zinc-300 p-2">
                    <img src={entry.image1} alt="" className='w-[200px] h-[100px]'  onClick={handleImageClick}/>
                    {isZoomed && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={entry.image1}
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
                  </td>
                  <td className="border border-zinc-300 p-2">
                    <img src={entry.image2} alt="" className='w-[200px] h-[100px]'  onClick={handleImageClick2}/>
                    {isZoomed2 && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                          <div className="relative" onClick={handleCloseClick}>
                            <img
                              src={entry.image2}
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
                  </td>
                  <td className="border border-zinc-300 p-2">
                    <button className="bg-green-500 text-white hover:bg-green-600 rounded p-1 mr-2"
                     disabled={loader?true:false} 
                    onClick={() => handleApprove(entry._id)}>Approve</button>
                    <button className="bg-red-500 text-white hover:bg-red-600 rounded p-1"
                     disabled={loader?true:false} 
                    onClick={() => handleReject(entry._id)}>Reject</button>
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

export default PendingKyc
