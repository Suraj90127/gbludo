import React, { useEffect } from "react";
import { BsHeadset } from "react-icons/bs";


import ludo1 from "./Assets/17187106486.jpg";
import ludo2 from "./Assets/17187111885.jpg";
import ludo from "./Assets/ludo.jpg"
import { Link } from "react-router-dom";
import { adminSetting } from "../store/reducer/adminReducer";
import { useDispatch, useSelector } from "react-redux";

const WinCash = () => {
  const dispatch = useDispatch()
  const { adminSettingData } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(adminSetting())
  }, [])

  const handlefun = () => {
    alert("Comming soon")
  }
  return (
    <div>
      <div className="p-4 mt-[60px]">
        {/* <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center mb-2 relative">
            <span className="text-[#dc3545] text-[1rem] font-semibold absolute top-[-20px]">
              SHORT NOTICE
            </span>
          </div>
          <p className="text-blue-500 text-center">
            5% commission: {Array.isArray(adminSettingData) ? adminSettingData[0]?.referralCommission : 0}% referral:
          </p>
        </div> */}

        <div className="bg-[#dc3545] text-white p-2 rounded-lg mb-4">
          <p>{Array.isArray(adminSettingData) ? adminSettingData[0]?.marquee : "No Banner"}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Our Games</h2>
          <div className="grid grid-cols-2 gap-1">
          {/* <Link to="/rich-mood">
              <div className="bg-white p-1 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-500 text-[0.75rem]">
                    🔴 ONLY CLASSIC LIVE
                  </span>
                </div>
                <img src={ludo} alt="Ludo Classic 2" className="w-[300px] h-[200px] mb-2" />
                <p className="text-center font-semibold">Ludo Classic 2</p>
              </div>
            </Link> */}

            {Array.isArray(adminSettingData) && adminSettingData[0]?.game?.filter(game => game.gstatus == 1).map((game, i) => (
              <Link key={i} to="/rich-mood">
                <div className="bg-white p-1 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-500  text-[0.75rem]">
                      🔴 {game.gname}
                    </span>
                  </div>
                  <img src={game?.gimage} alt="Ludo Classic" className="w-[300px] h-[200px] mb-2" />
                  <p className="text-center font-semibold">{game.gname}</p>
                </div>
              </Link>
            ))}
          
          </div>
        </div>
        
      </div>
      
      {/* <div className="flex gap-3 mt-[40px] w-full p-4">
      <Link to="/rich-mood" className="w-[80%]">
        <button className=" text-white w-full px-4 py-4 rounded-lg" style={{backgroundColor:"#21252a"}}>Play Now</button>
        </Link>
        <div>
        <Link className="flex items-center justify-center w-[20%] rounded-full font-bold p-4 text-white" style={{backgroundColor:"#106efa"}}><BsHeadset className="text-2xl" /></Link>
        </div>
      </div> */}
      
    </div>
  );
};

export default WinCash;
