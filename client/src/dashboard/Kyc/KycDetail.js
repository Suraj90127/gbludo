import React, { useEffect } from 'react'
import { FaRegImage, FaTrophy, FaSadTear, FaUser } from 'react-icons/fa';
import { adminDeleteKyc, adminGetKyc, adminKycDetails, adminRejectedKyc, adminViewUser, adminViewUserBank } from '../../store/reducer/adminReducer';
import { formatDate } from '../Pages/FormateDate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const KycDetail = () => {
  const { userKycDetails,userKycDetails1,userKycDetails2} = useSelector((state) => state.admin)
const navigate=useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const handleReject = (id)=>{
    dispatch(adminRejectedKyc(id)).then((res)=>{    
        alert(res.payload.message)   
    })
  }
  const handleDelete = (id)=>{
    dispatch(adminDeleteKyc(id)).then((res)=>{    
        alert(res.payload.message)   
        if(res.payload.success){
          navigate("/dashboard/all-kyc")
        }
    })
  }
  useEffect(() => {
    dispatch(adminKycDetails(id))
  }, [])
  return (
    <div className='w-full'>
      <div className="flex items-center flex-wrap sm:w-[100%] md:w-[100%] justify-between p-2 bg-white rounded-lg shadow-md">
        <div className="">
          <FaUser className="text-primary text-5xl rounded-full border-2 border-primary" />
          <div className="text-primary font-semibold">{userKycDetails2?.name}</div>
          <div className="text-muted-foreground">{userKycDetails2?.phone}</div>
        </div>
        <div className="flex text-center gap-5">
          <div className="text-green-500">{userKycDetails2?.earning}</div>
          <FaTrophy className="text-green-500 text-2xl" />
          <div className="text-red-500">{userKycDetails2?.money}</div>
          <FaSadTear className="text-red-500 text-2xl" />
        </div>
        <div className={`text-${userKycDetails?.status==0?"orange":userKycDetails?.status==1?"green":"red"}-500`}>{userKycDetails?.status==0?"Un-Verified":userKycDetails?.status==1?"Verified":"Rejected"}</div>
      </div>
      <div className='bg-[#4e73df] text-white flex justify-between p-3'>
        <h2 className='font-bold text-[1.3rem]'>
        Update Kyc Status</h2>
        <div>

        <button className='px-3 py-2 bg-lime-500 rounded-sm mr-2' onClick={()=>handleDelete(userKycDetails?._id)}>Delete Kyc</button>
        <button className='px-3 py-2 bg-[red] rounded-sm' onClick={()=>handleReject(userKycDetails?._id)}>Reject Kyc</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between  space-y-6 md:space-y-0">
        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">KYC Documents Details</h2>
          <table className="min-w-full border border-zinc-300">
            <tbody>
            <tr>
                <td className="border border-zinc-300 p-3 font-medium">Front Side Image</td>
                <td className="border border-zinc-300 p-3">
                 {userKycDetails?.image1?(
                  <img src={userKycDetails?.image1} alt="" className='w-[200px] h-[100px]' />
                 ):(
                  <FaRegImage className="w-8 h-8 text-gray-500" />
                 )}
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Back Side Image</td>
                <td className="border border-zinc-300 p-3">
                {userKycDetails?.image2?(
                  <img src={userKycDetails?.image2} alt="" className='w-[200px] h-[100px]' />
                 ):(
                  <FaRegImage className="w-8 h-8 text-gray-500" />
                 )}
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Verify Document Status</td>
                <td className={`border border-zinc-300 p-3 ${userKycDetails?.status==0?"text-orange-500":userKycDetails?.status==1?"text-green-500":"text-red-500"}`}>{userKycDetails?.status==0?"Pending":userKycDetails?.status==1?"Verified":"Rejected"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">Bank Account Details</h2>
          <table className="min-w-full border border-zinc-300">
          <tbody>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">UPI - Account Holder Name</td>
                <td className="border border-zinc-300 p-3">{userKycDetails1?.name}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">UPI - Id</td>
                <td className="border border-zinc-300 p-3">{userKycDetails1?.upi}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - Holder Name</td>
                <td className="border border-zinc-300 p-3">{userKycDetails1?.name}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - Account Number</td>
                <td className="border border-zinc-300 p-3">{userKycDetails1?.accountNo}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Bank Account - IFSC Code</td>
                <td className="border border-zinc-300 p-3">{userKycDetails1?.ifsc}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Created at</td>
                <td className="border border-zinc-300 p-3">{formatDate(userKycDetails1?.createdAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-2 rounded-lg">
          <h2 className="text-xl font-bold p-2 bg-[#4e73df] text-white">Other Details</h2>
          <table className="min-w-full border border-zinc-300">
          <tbody>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Phone</td>
                <td className="border border-zinc-300 p-3">{userKycDetails2?.phone}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Wallet</td>
                <td className="border border-zinc-300 p-3">💰 {userKycDetails2?.money}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Referral Code</td>
                <td className="border border-zinc-300 p-3">{userKycDetails2?.code}</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Referred By</td>
                <td className="border border-zinc-300 p-3">updated_referred_by</td>
              </tr>
              <tr>
                <td className="border border-zinc-300 p-3 font-medium">Created at</td>
                <td className="border border-zinc-300 p-3">{formatDate(userKycDetails2?.createAt)}</td>
              </tr>
            </tbody>
          </table>
          {/* <button className="mt-4 bg-[#36b9cc] text-white hover:bg-secondary/80 p-2 rounded-lg transition-colors">
            Update Now
          </button> */}
        </div>
      </div>

      
    </div>
  )
}

export default KycDetail
