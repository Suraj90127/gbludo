import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FaDice } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BiWinkSmile } from "react-icons/bi";
import Cookies from "js-cookie";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    players: false,
    battle: false,
    kyc: false,
  });

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <aside
      className={classNames(
        "absolute top-0 left-0 h-auto w-[80%] md:w-[15%] bg-[#4e73df] text-white transition-transform duration-300 ease-in-out",
        {
          "transform translate-x-0": isOpen,
          "transform -translate-x-full": !isOpen,
        }
      )}
    >
      {/* Sidebar Content */}
      <div className="p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-center w-full flex items-center justify-center mt-3">
            <BiWinkSmile />
            ADMIN
          </h2>
          {/* Close Sidebar Button */}
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            {isOpen ? "Close" : "Open"}
          </button>
        </div>
        <ul className="mt-6">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-white bg-blue-700 rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <BsSpeedometer2 />
                Dashboard
              </span>
            </Link>
          </li>
          {/* Other Sidebar Items */}
          <li>
            <button
              onClick={() => toggleDropdown("players")}
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md w-full"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Players
              </span>
            </button>
            {isDropdownOpen.players && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to="/dashboard/all-players"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    All Players
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/block-players"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Blocked Players
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("battle")}
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md w-full"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <FaDice />
                Battle
              </span>
            </button>
            {isDropdownOpen.battle && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to="/dashboard/new-battle"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    New Battle
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/runing-battle"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Running Battle
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/battle-result"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Battle Result
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/battle-dispute"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Battle Dispute
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/battle-all"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    All Bets
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("kyc")}
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md w-full"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <FaDice />
                KYC
              </span>
            </button>
            {isDropdownOpen.kyc && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to="/dashboard/pending-kyc"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Pending KYC
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/approve-kyc"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Approved KYC
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/all-kyc"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    All KYC
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("pay")}
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md w-full"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <FaDice />
                Payment
              </span>
            </button>
            {isDropdownOpen.pay && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to="/dashboard/pay-recieved"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Payment Received
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/recharge"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Recharge to User
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/pay-setting"
                    className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
                  >
                    Payment Settings
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Remaining menu items */}
          <li>
            <Link
              to="/dashboard/deposit"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <BsSpeedometer2 />
                Deposit Request
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/withdraw"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <BsSpeedometer2 />
                Withdraw Request
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin-setting"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Admin Settings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/games"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Games
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/dashboard/notification"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Notifications
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/dashboard/marquee"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Marquee Notifications
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/support"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Support
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/dashboard/term"
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="mx-2 text-[1rem] font-semibold flex items-center gap-1">
                <IoPerson />
                Term & Privacy Policy
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              onClick={handleLogout}
              className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <span className="text-[1rem] font-semibold flex items-center gap-1">
                <CiLogout />
                Log Out
              </span>
            </Link>
          </li>
          {/* Additional menu items */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
