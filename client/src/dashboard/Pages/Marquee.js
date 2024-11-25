import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { adminMarquee, adminSetting } from '../../store/reducer/adminReducer';

const Marquee = () => {

  
  const {adminSettingData,successMessage,errorMessage} =useSelector((state)=>state.admin)
  const dispatch=useDispatch()
  const [marquee, setMarquee] = useState("");
  const [status, setStatus] = useState("");


  const handleSubmit = () => {
    console.log("object",status)
    dispatch(adminMarquee({marquee,status})).then(()=>{
      alert(successMessage)
      dispatch(adminSetting())
    }).catch(()=>{
      alert(errorMessage)
    })
  };

  useEffect(()=>{
    dispatch(adminSetting())
    if(Array.isArray(adminSettingData) && adminSettingData){
      setMarquee(adminSettingData[0]?.marquee)
     }
  },[dispatch])

  return (
    <div className="w-[100%]">
       <div className="p-6 w-[100%] mx-auto bg-card text-card-foreground rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Marquee Notification View</h1>
              <nav className="mb-4">
                <a href="#" className="text-primary hover:underline">
                  Marquee Notification View
                </a>
              </nav>
              <div className="bg-white text-popover-foreground p-6 rounded-lg shadow-inner">
                <h2 className="text-xl font-medium mb-4">Marquee Notification Editable Details</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="marquee-text" className="block text-sm font-medium mb-2">
                        Marquee Notification Text
                      </label>
                      <textarea id="marquee-text" value={marquee} onChange={(e)=>setMarquee(e.target.value)} className="w-full p-2 border border-input rounded-md" rows="4"></textarea>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <select id="status"    value={status}
    onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border border-input rounded-md">
                        <option value="show" >Show on Website</option>
                        <option value="hide" >Hide from Home Page</option>
                      </select>
                    </div>
                  </div>
                </form>
                  <button type="submit" onClick={handleSubmit} className="bg-[#4e73df] text-white hover:bg-primary/80 px-4 py-2 rounded-sm">
                    Update Marquee Notification
                  </button>
              </div>
            </div>
    </div>
  )
}

export default Marquee
