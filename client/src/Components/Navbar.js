// Navbar.js
import { LiaRupeeSignSolid } from "react-icons/lia";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "./Assets/logo.png";
import "./Navbar.css"; // Import your CSS file
import profile from "./Assets/Avatar2.png";
import Wallet from "./Assets/sidebar-wallet.png";
import Win from "./Assets/gamepad.png";
import Games from "./Assets/sidebar-gamesHistory.png";
import Transctions from "./Assets/order-history.png";
import Refer from "./Assets/sidebar-referEarn.png";
import Download from "./Assets/dw.png";
import Notification from "./Assets/sidebar-notifications.png";
import Support from "./Assets/sidebar-support.png";
import money from "./Assets/global-rupeeIcon.png";
import bag from "./Assets/notification2.png";
import { useDispatch, useSelector } from "react-redux";
import { adminSetting } from "../store/reducer/adminReducer";
import Whatsapp from "./Assets/whatsapp.webp"
const Navbar = () => {
  const { userDetail } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { adminSettingData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminSetting());
  }, []);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  


  return (
    <>
      <nav>
        <div className="top-section flex justify-around">
          <div className="logo flex gap-5">
            <button className="menu-toggle" onClick={toggleNavbar}>
              <BiMenuAltLeft className="cursor-pointer" />
            </button>
            {/* Your logo image or text */}
            <Link to="/">
              <img src={logo} alt="" className="rounded-full"/>
            </Link>
          </div>
          <div className="flex gap-3">
            <div className="h-[30px] text-black border rounded  flex items-center p-2  gap-0" onClick={() => navigate("/add-fund")}>
              <div>
                <img src={money} alt="" className="w-[20px]" />
              </div>
              <div className="flex items-center font-medium justify-center flex-col">

                <p className="text-[12px] font-bold  flex items-center">
                  <LiaRupeeSignSolid className="font-bold" />
                  {userDetail?.money?.toFixed(2)}
                </p>
              </div>
            </div>

          </div>


          <div className="fixed bottom-2 right-2">
            <Link
              className="text-[1rem]"
              to={`https://wa.me/+91${Array.isArray(adminSettingData)
                  ? adminSettingData[0]?.whatsapp
                  : "not found"
                }`}
            >

              <img src={Whatsapp} alt="" className='w-[60px]' />

            </Link>
          </div>


        </div>
        <div className={`navbar ${isOpen ? "open" : ""}`}>
          <ul className="menu">
            {/* Example list of menu items */}
            <li>
              <Link to="/profile" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={profile} alt="" /> My Profile
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Win} alt="" /> Play
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/wallet" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Wallet} alt="" /> My Wallet
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/game-history" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Games} alt="" /> Games History
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/deposit-history" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Games} alt="" /> Deposit History
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/withdraw-history" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Games} alt="" /> Withdraw History
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li> */}
            <li>
              <Link to="/transaction" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Transctions} alt="" /> Transctions History
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/refer" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Refer} alt="" /> Refer & Earn
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/refer-history" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Refer} alt="" />
                  Referral History
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li> */}


            <li>
              <Link to="/support" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Support} alt="" />
                  Support
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" onClick={toggleNavbar}>
                <span className="menu-name">
                  <img src={Support} alt="" />
                  Privacy Policy
                </span>{" "}
                <span className="arrow">➔</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Backdrop for darkening the background */}
      {isOpen && <div className="backdrop" onClick={toggleNavbar}></div>}
    </>
  );
};

export default Navbar;
