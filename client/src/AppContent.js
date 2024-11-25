import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./Components/Navbar.js";
import Right from "./Components/Right";
import Support from "./Components/Support";
import Refer from "./Components/Refer";
import Transaction from "./Components/Transaction";
import Wallet from "./Components/Wallet";
import AddFund from "./Components/AddFund";
import Profile from "./Components/Profile";
import WinCash from "./Components/WinCash";
import LiteMood from "./Components/LiteMood";
import RichMood from "./Components/RichMood";
import GameHistory from "./Components/GameHistory";
import ReferalHistory from "./Components/ReferalHistory";
import Notification from "./Components/Notification";
import Login from "./Components/Login";
import ViewBattle from "./Components/ViewBattle";
import { getUser, loadToken } from "./store/reducer/authReducer.js";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute.js";
import Withdraw from "./Components/Withdraw";
import Upi from "./Components/Upi";
import Bank from "./Components/Bank";
import Pay from "./Components/Pay.js";

// Dashboard
import Sidebar from "./dashboard/layout/Sidebar";
import Dashboard from "./dashboard/Pages/Dashboard";
import AllPlayers from "./dashboard/Pages/AllPlayers";
import BlockPlayers from "./dashboard/Pages/BlockPlayers";
import NewBattle from "./dashboard/Pages/NewBattle";
import RuningBattle from "./dashboard/Pages/RuningBattle";
import BattleResult from "./dashboard/Pages/BattleResult";
import BattleDispute from "./dashboard/Pages/BattleDispute";
import AllBets from "./dashboard/Pages/AllBets";
import Deposits from "./dashboard/Pages/Deposit";
import Withdraws from "./dashboard/Pages/Withdraw";
import AdminSetting from "./dashboard/Pages/AdminSetting";
import Gameses from "./dashboard/Pages/Games";
import Notifications from "./dashboard/Pages/Notification";
import Marquee from "./dashboard/Pages/Marquee";
import Supports from "./dashboard/Pages/Support";
import Term from "./dashboard/Pages/Term";
import PaymentRecived from "./dashboard/Payments/PaymentRecived";
import RechargeUser from "./dashboard/Payments/RechargeUser";
import PaymentSetting from "./dashboard/Payments/PaymentSetting";
import PaymentDetail from "./dashboard/Payments/PaymentDetail";
import Recharge from "./dashboard/Payments/Recharge";
import AddNotification from "./dashboard/Pages/AddNotification";
import AddGame from "./dashboard/Pages/AddGame";
import Spinner from "./Components/Spinner";
import Cookies from "js-cookie";
import DepositHistory from "./Components/DepositHistory.js";
import WithdrawHistory from "./Components/WithdrawHistory.js";
import DisputeDetail from "./dashboard/Pages/DisputeDetail.js";
import PlayerView from "./dashboard/Pages/PlayerView.js";

import BattleControl from "./dashboard/Pages/BattleControl.js";
import ApprovedKyc from "./dashboard/Kyc/ApprovedKyc.js";
import PendingKyc from "./dashboard/Kyc/PendingKyc.js";
import KycDetail from "./dashboard/Kyc/KycDetail.js";
import Kyc from "./Components/Kyc.js";
import History from "./Components/History.js";
import AdminPrivateRoute from "./Components/AdminPrivateRoute.js";
import Redeem from "./Components/Redeem.js";
import Allkyc from "./dashboard/Kyc/Allkyc.js";
import PrivacyPolicy from "./Components/PrivacyPolicy.js";

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, userload, userInfo } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");

  return (
    <>
      <div className={`body ${isDashboard ? "dashboard" : "gamesection"}`}>
        {!isDashboard && (
          <>
            <div className="left-side">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="" element={<WinCash />} />
                    <Route path="support" element={<Support />} />
                    <Route path="refer" element={<Refer />} />
                    <Route path="redeem" element={<Redeem/>} />
                    <Route path="his" element={<History />} />
                    <Route path="transaction" element={<Transaction />} />
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="add-fund" element={<AddFund />} />
                    <Route path="recharge/pay" element={<Pay />} />
                    
                    <Route path="privacy" element={<PrivacyPolicy />} />
                    <Route
                      path="deposit-history"
                      element={<DepositHistory />}
                    />
                    <Route
                      path="withdraw-history"
                      element={<WithdrawHistory />}
                    />
                    <Route path="lite-mood" element={<LiteMood />} />
                    <Route path="rich-mood" element={<RichMood />} />
                    <Route path="game-history" element={<GameHistory />} />
                    <Route path="refer-history" element={<ReferalHistory />} />
                    <Route path="alert" element={<Notification />} />
                    <Route path="view-battle" element={<ViewBattle />} />
                    <Route path="view-battle/:id" element={<ViewBattle />} />

                    <Route path="withdraw" element={<Withdraw />} />
                    <Route path="upi" element={<Upi />} />
                    <Route path="bank" element={<Bank />} />
                    <Route path="/kyc" element={<Kyc />} />
                    {/* Define other routes that you need */}
                  </Route>
                </Routes>
              </main>
            </div>

            <div className="right-side">
              <Right />
            </div>
          </>
        )}
        {isDashboard && (
          <div className="relative flex w-[100%] h-[150vh]">
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              className="h-auto absolute"
            />
            {/* Main Content */}
            <div
              className={`flex-1 ${
                isSidebarOpen ? "ml-0" : ""
              } flex flex-col transition-all duration-300 ease-in-out sm:items-center md:items-end `}
            >
              <header className="flex items-center justify-between p-4 bg-white shadow sm:w-[100%] md:w-[85%] ">
                {/* Toggle Sidebar Button for Mobile */}
                <button
                  className="md:hidden p-2 focus:outline-none"
                  onClick={toggleSidebar}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-bold">Dashboard</h1>
              </header>
              <main className="sm:[100%] md:w-[85%]  h-full   py-6 px-2 bg-[#f3f4f6] flex justify-center">
                <Routes>
                  <Route path="/dashboard/" element={<AdminPrivateRoute />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="all-players" element={<AllPlayers />} />
                    <Route path="block-players" element={<BlockPlayers />} />
                    <Route path="new-battle" element={<NewBattle />} />
                    <Route path="runing-battle" element={<RuningBattle />} />
                    <Route path="battle-result" element={<BattleResult />} />
                    <Route path="battle-dispute" element={<BattleDispute />} />
                    <Route path="battle-all" element={<AllBets />} />
                    <Route path="pay-recieved" element={<PaymentRecived />} />
                    <Route path="recharge" element={<RechargeUser />} />
                    <Route path="pay-setting" element={<PaymentSetting />} />
                    <Route path="pay-detail" element={<PaymentDetail />} />
                    <Route path="recharge-page" element={<Recharge />} />
                    <Route path="deposit" element={<Deposits />} />
                    <Route path="withdraw" element={<Withdraws />} />
                    <Route path="admin-setting" element={<AdminSetting />} />
                    <Route path="games" element={<Gameses />} />
                    <Route path="notification" element={<Notifications />} />
                    <Route path="marquee" element={<Marquee />} />
                    <Route path="support" element={<Supports />} />
                    <Route path="term" element={<Term />} />
                    <Route
                      path="add-notification"
                      element={<AddNotification />}
                    />
                    <Route path="add-game" element={<AddGame />} />
                    <Route path="bet-details/:id" element={<DisputeDetail />} />
                    <Route path="player-view/:id" element={<PlayerView />} />
                    <Route
                      path="battle-control/:id"
                      element={<BattleControl />}
                    />
                    <Route path="all-kyc" element={<Allkyc />} />
                    <Route path="approve-kyc" element={<ApprovedKyc />} />
                    <Route path="pending-kyc" element={<PendingKyc />} />
                    <Route path="kyc-detail/:id" element={<KycDetail />} />
                  </Route>
                </Routes>
              </main>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default AppContent;
