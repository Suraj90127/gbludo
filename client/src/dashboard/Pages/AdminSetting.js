import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminSetCommission, adminSetting,adminSignUpBonus } from '../../store/reducer/adminReducer'

const AdminSetting = () => {
  const {adminSettingData,successMessage,errorMessage} =useSelector((state)=>state.admin)
  const [batt1,setBatt1]=useState()
  const [refer,setRefer]=useState()
  const [batt0,setBatt0]=useState()
  const [signUp,setSignUp]=useState()
  const dispatch=useDispatch()

const handleSubmitCommission=()=>{
  dispatch(adminSetCommission({batt1,batt0,refer})).then(()=>{
    alert(successMessage)
    dispatch(adminSetting())
  }).catch(()=>{
    alert(errorMessage)
  })
}
const handleSubmitSignup=()=>{
  dispatch(adminSignUpBonus(signUp)).then(()=>{
    alert(successMessage)
    dispatch(adminSetting())
  }).catch(()=>{
    alert(errorMessage)

  })
}
  useEffect(()=>{
    dispatch(adminSetting())
    if(Array.isArray(adminSettingData) && adminSettingData){
      setBatt1(adminSettingData[0]?.battleCommission1)
      setBatt0(adminSettingData[0]?.battleCommission0 )
      setRefer(adminSettingData[0]?.referralCommission)
      setSignUp(adminSettingData[0]?.signUpBonus)
     }
  },[dispatch])
  return (
    <div className="w-[100%]">
       <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#4e73df]">Admin Settings</h2>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-primary mb-2 ">Set Admin Commission and Credentials</h3>
                <div className="mb-4">
                  <h4 className="text-md font-medium text-[#4e73df] mb-1">Commission Settings</h4>
                  <label className="block mb-2 text-muted-foreground">Battle Commission (With Referral)</label>
                  <input type="number" value={batt1} onChange={(e)=>setBatt1(e.target.value)} className="w-full p-2 mb-2 border rounded-md bg-input text-foreground" />
        
                  <label className="block mb-2 text-muted-foreground">Referral Commission</label>
                  <input type="number" value={refer} onChange={(e)=>setRefer(e.target.value)} className="w-full p-2 mb-2 border rounded-md bg-input text-foreground" />
        
                  <label className="block mb-2 text-muted-foreground">Battle Commission (Without Referral)</label>
                  <input type="number" value={batt0} onChange={(e)=>setBatt0(e.target.value)} className="w-full p-2 mb-2 border rounded-md bg-input text-foreground" />
        
                  <button className="bg-[#4e73df] text-white hover:bg-secondary/80 p-2 rounded-sm" onClick={handleSubmitCommission}>Update Now</button>
                </div>
        
                <div className="mb-4">
                  <h4 className="text-md font-medium text-[#4e73df] mb-1">Sign Up Bonus</h4>
                  <label className="block mb-2 text-muted-foreground">Set SignUp Bonus Amount</label>
                  <input type="number" value={signUp} onChange={(e)=>setSignUp(e.target.value)} className="w-full p-2 mb-2 border rounded-md bg-input text-foreground" />
        
                  <button className="bg-[#4e73df] text-white hover:bg-secondary/80 p-2 rounded-sm" onClick={handleSubmitSignup}>Submit</button>
                </div>        
                <div>
                  <h4 className="text-md font-medium text-[#4e73df] mb-1">Game Settings</h4>
                  <label className="block mb-2 text-muted-foreground">Mode</label>
                  <select className="w-full p-2 mb-2 border rounded-md bg-input text-foreground">
                    <option>Manual RoomCode</option>
                  </select>        
                  <button className="bg-[#4e73df] text-white hover:bg-secondary/80 p-2 rounded-sm">Update Now</button>
                </div>
              </div>
            </div>
    </div>
  )
}

export default AdminSetting
