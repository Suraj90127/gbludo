import React, { useEffect, useState } from 'react'
import ptm from '../../Components/Assets/PaytmPG.jpeg'
import UPI from '../../Components/Assets/UPI gateway.jpg'
import cash from '../../Components/Assets/cashfree.png'
import { useDispatch, useSelector } from 'react-redux'
import { adminSetting, adminSetUPI } from '../../store/reducer/adminReducer'

const PaymentSetting = () => {
  const {adminSettingData,successMessage,errorMessage} =useSelector((state)=>state.admin)
  const [upi,setUpi]=useState("")
  const [name,setName]=useState("")
const handleSubmit=()=>{
  dispatch(adminSetUPI({upi,name})).then(()=>{
    alert(successMessage)
  }).catch(()=>{
    alert(errorMessage)

  })
}
console.log("object",adminSettingData)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(adminSetting())
   if(Array.isArray(adminSettingData) && adminSettingData){
    setUpi(adminSettingData[0]?.upi)
    setName(adminSettingData[0]?.name)
   }
  },[dispatch])
  return (
    <div className="p-1 bg-white w-full  text-card-foreground">
      <h1 className="text-2xl font-semibold mb-4">Payment Gateway Settings</h1>
      {/* <div className="mb-6">
        <label className="block text-muted-foreground mb-2">Choose Active Gateway</label>
        <div className="flex items-center space-x-4 ">
          <select className="border border-input rounded p-2 w-[200px]">
            <option>UPI Gateway</option>
          </select>
          <button className="bg-[#4e73df] text-white px-3 w-[120px] py-2 rounded">Active Now</button>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* <div className="border border-border p-4 rounded">
          <img src={ptm} alt="Paytm PG" className="mb-4 w-[200px]" />
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Merchant ID</label>
            <input type="text" className="border border-input rounded p-2 w-full" value="kOtBHH0951asdasdas" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Merchant Key</label>
            <input type="text" className="border border-input rounded p-2 w-full" value="7SOcRkAqasdadas" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Minimum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="10" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Maximum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="100000" />
          </div>
          <button className="bg-[#4e73df] text-white px-4 py-2 rounded">Save Details</button>
        </div>

        <div className="border border-border p-4 rounded">
          <img src={cash} alt="Cashfree Payments" className="mb-4 w-[200px]" />
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">CASHFREE API KEY</label>
            <input type="text" className="border border-input rounded p-2 w-full" value="174787c96bcef08e2838ff8e787471" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">CASHFREE API SECRET KEY</label>
            <input type="text" className="border border-input rounded p-2 w-full" value="d42c94ca464249d592ddbc7571da802497b8185b" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Minimum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="10" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Maximum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="100000" />
          </div>
          <button className="bg-[#4e73df] text-white px-4 py-2 rounded">Save Details</button>
        </div> */}


        <div className="border border-border p-4 rounded">
          <img src={UPI} alt="UPI Gateway" className="mb-4 w-[200px]" />
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">UPI GATEWAY API KEY</label>
            <input type="text" className="border border-input rounded p-2 w-full" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Please Name' />
            <input type="text" className="border border-input rounded p-2 w-full" value={upi} onChange={(e)=>setUpi(e.target.value)} placeholder='Please set upi' />
          </div>
          {/* <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Minimum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="10" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-2">Maximum Add Amount for player</label>
            <input type="number" className="border border-input rounded p-2 w-full" value="100000" />
          </div> */}
          <button className="bg-[#4e73df] text-white px-4 py-2 rounded" onClick={handleSubmit}>Save Details</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSetting
