import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import wallet from "./Assets/sidebar-wallet.png";
import img1 from "./Assets/sidebar-referEarn.png";
import img2 from "./Assets/global-cash-won-green-circular.png";
import img3 from "./Assets/global-purple-battleIcon.png";
import img4 from "./Assets/referral-signup-bonus-new.png";
import profile from "./Assets/Avatar2.png";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getKyc,
  getReferralCommission,
  updateProfile,
  user_reset,
} from "../store/reducer/authReducer";
import { FaIdCard } from "react-icons/fa"; // Icon for KYC
import { FaRegCheckCircle } from "react-icons/fa"; // Icon for "Under Review"
import Cookies from "js-cookie";
import { betHistory } from "../store/reducer/gameReducer";
const Profile = () => {
  const { userDetail, kycData, referralCommissions, successMessage } =
    useSelector((state) => state.auth);
    const { bethitorys } = useSelector((state) => state.bet);

  const [isEditing, setIsEditing] = useState(true);
  const [username, setUsername] = useState(userDetail?.name);

  const dispatch = useDispatch();
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(username));
  };
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    window.location.href = "/login";
    dispatch(user_reset())
  };
  useEffect(() => {
    dispatch(getKyc());
    dispatch(getReferralCommission());
    dispatch(betHistory())
  }, []);

  useEffect(() => {
  
  }, [successMessage, dispatch]);

  const totalEarnings =
    referralCommissions?.reduce(
      (acc, transaction) => acc + transaction.money,
      0
    ) || 0;

  return (
    <div>
      <div className="flex flex-col items-center p-4 bg-card text-card-foreground rounded-lg shadow-md mt-[60px]">
        <img
          src={profile}
          alt="User avatar"
          className="rounded-full mb-2 h-[100px]"
        />
        <p className="text-muted-foreground">+91{userDetail?.phone}</p>
        <h2 className="font-bold text-lg flex items-center text-center justify-center">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoFocus
              className="border rounded-lg p-1 outline-none border-blue-100"
            />
          ) : (
            <>
              {userDetail?.name}
              <LuPencilLine onClick={handleEditClick} />
            </>
          )}
        </h2>
        <button
          className="bg-[#3a86ff] mt-2  text-white px-5 py-2 rounded-lg text-xl"
          onClick={handlesubmit}
        >
          submit
        </button>
        <Link to="/wallet" className="w-full">
          <div className="flex items-center mt-4 w-full border border-border rounded-lg p-2">
            <img
              src={wallet}
              className="h-[30px] mr-[30px]"
              alt="wallet-icon"
            />
            <span className="text-gray text-[1.1rem]">My Wallet</span>
          </div>
        </Link>
      </div>
      <div className="flex  justify-center items-center p-4 bg-white shadow-md rounded-md">
        {kycData?.status == 1 ? (
          <div className="text-center w-[100%]">
            <h2 className="text-xl font-bold mb-2">Complete Profile</h2>
            <Link>
              <div className="flex items-center bg-green-500 p-4 rounded-md">
                <div className="flex items-center mx-4 ">
                  <FaIdCard className="text-blue-500" size={40} />
                  <span className="ml-6 text-white text-lg font-semibold w-[100%]">
                    KYC Completed
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="text-center w-[100%]">
            <h2 className="text-xl font-bold mb-2">Complete Profile</h2>
            <Link to="/kyc">
              <div className="flex items-center bg-gray-100 p-4 rounded-md">
                <div className="flex items-center mx-4 ">
                  <FaIdCard className="text-blue-500" size={40} />
                  <span className="ml-6 text-gray-600 text-lg font-semibold w-[100%]">
                    KYC Under Review
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="p-4 space-y-8 bg-card text-card-foreground rounded-lg shadow-lg">
        {/* <div className="flex items-center space-x-3">
          <img src={img1} alt="user-plus" className="h-[30px]" />
          <input
            type="text"
            placeholder="Refer Code"
            className="border-b-2 h-[40px] w-[200px]"
          />
          <IoMdCheckmark className="text-[30px] text-[green]" />
        </div> */}

        <div className="flex items-center">
          <img src={img2} alt="cash" className="w-8 h-8  mr-[20px]" />
          <div>
            <span className="text-[0.9rem] font-semibold">CASH WON</span>
            <div className="flex items-center space-x-2">
              <span className="text-[gray] text-lg font-bold">
                ₹{(userDetail?.money-userDetail?.cashwon).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <img src={img4} alt="celebration" className="w-8 h-8  mr-[20px]" />
          <div>
            <span className="text-[0.9rem] font-semibold">
              TOTAL REFERAL EARNINGS:
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[gray] text-lg font-bold">
                ₹{totalEarnings}
              </span>
              <a href="#" className="text-accent font-semibold">
                Redeem
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img
            src={img3}
            alt="battle"
            className="w-8 h-8 bg-red-500 rounded-full p-1"
          />
          <div>
            <span className="text-[0.9rem] font-semibold">BATTLE PLAYED</span>
            <div className="text-[gray] text-lg font-bold">
              {bethitorys?.length}
            </div>
          </div>
        </div>
      </div>
      <button
        className=" w-[90%] ml-[5%] border border-[#d3ffd3] hover:bg-[#d3ffd3] shadow-lg rounded-sm font-bold text-[1.4rem] text-gray-500 mt-4 p-2"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
