import React, { useEffect, useState } from 'react'
import './style.css'
import img from './Assets/refer.svg'
import { Link, useActionData } from 'react-router-dom'
import img1 from './Assets/referral-signup-bonus-new.png'
import img2 from './Assets/banner_illsutration.png'
import { useDispatch, useSelector } from 'react-redux'
import { getReferralCommission, getUser } from '../store/reducer/authReducer'
import Whatsapp from "./Assets/whatsapp.webp"
import Telegram from "./Assets/telegram.webp"
import { MdOutlineFileCopy } from "react-icons/md";
import { adminSetting } from '../store/reducer/adminReducer'

const Refer = () => {
  const { userDetail } = useSelector((state) => state.auth);

  const referralCode = userDetail?.code
  const { adminSettingData } = useSelector((state) => state.admin)
const [refers,setRefers]=useState()
  
  // const currentUrl = window.location.href;
  // const baseUrl = currentUrl.split('/refer')[0];
  const updatedReferralUrl = `${window.location.origin}/login?invite=${referralCode}`;
 const handleCopy = () => {
  navigator.clipboard.writeText(updatedReferralUrl);
  alert('Copied to clipboard');
  
 }

 const { referralCommissions } = useSelector((state) => state.auth);
 const dispatch = useDispatch();

 
 useEffect(() => {
   dispatch(getReferralCommission());
   dispatch(adminSetting())

 }, [dispatch]);

useEffect(() => {
  
  dispatch(getUser()).then((res)=>{
    setRefers(res.payload.refercount)
  });
}, [refers]);
 
  return (
    <div className='Refer mt-[60px]'>
        <div className="Refer-top">
            <img src={img} alt="" />
            <h3 className="font-bold text-[23px] text-center">Earn now unlimited</h3>
            <p>Refer your friends now!</p>
            <h5 className="font-semibold text-[17px]">Your Refer Code: {userDetail?.code}</h5>
            <p>Total Refers: {refers}</p>
            <p>Total Earnings: <span className="font-semibold">₹{userDetail?.earning} <Link className="text-[#dc3545]" to={"/redeem"}>Redeem</Link></span></p>
        </div>
        <div className="bg-white mt-3 p-3 border-t-[15px] border-[rgb(175, 175, 175)]">
          <h2 className="font-bold text-[20px] text-center">Refer & Earn Rules</h2>


          <div className='flex items-center justify-center'>
            
          <Link
  to={`https://wa.me/?text=${encodeURIComponent(updatedReferralUrl)}`}
>
  <img src={Whatsapp} alt="" className='w-[60px]' />
</Link>


<Link  to={`https://t.me/${
          Array.isArray(adminSettingData)
            ? adminSettingData[0]?.telegram
            : "not found"
        }`}>
<img src={Telegram} alt=""  className='w-[50px] mx-5'  />
</Link>
<span><MdOutlineFileCopy className='text-lg ' onClick={handleCopy}/></span>
          </div>
          <div className="flex gap-2 justify-center items-center mt-2 w-[90%]">
            <img src={img1} className="w-[82px]" alt="" />
            <div>
              <p className="text-[1rem] font-semibold text-black" onClick={handleCopy}>When your friend signs up on {updatedReferralUrl} from your referral link,</p>
              <p className="text-[1rem] font-semibold text-[green]">You get {Array.isArray(adminSettingData) ? adminSettingData[0]?.referralCommission : 0}% Commission on your referral's winnings.</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center mt-4 w-[90%]">
            <img src={img2} className="w-[82px]" alt="" />
            <div>
              <p className="text-[1rem] font-semibold text-black">Suppose your referral plays a battle for ₹100 Cash,</p>
              <p className="text-[1rem] font-semibold text-[green]">You get ₹100 Cash</p>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Refer
