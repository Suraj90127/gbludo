import React, { useEffect } from "react";
import sword from "../../Components/Assets/battle.png";
import money from "../../Components/Assets/global-rupeeIcon.png";
import { CiClock2 } from "react-icons/ci";
import { ImUsers } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { ImBlocked } from "react-icons/im";
import { FaGamepad } from "react-icons/fa";
import { MdGamepad } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { RiCashFill } from "react-icons/ri";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/Spinner";
import {
  adminAllUsers,
  adminBattleResult,
  adminBlockUser,
  adminRechargeAll,
  adminRunningBattle,
  adminSetting,
  adminWithdrawAll,
} from "../../store/reducer/adminReducer";
import { formatDate } from "./FormateDate";

const battles = [
  {
    id: 1,
    battleId: "172119834434",
    player1: "EYMR7331",
    player2: "7JAYM681",
    amount: 100,
    status: "COMPLETED",
    statusColor: "text-primary",
    gameType: "Ludo Classic",
    date: "17 / 07 / 2024 12:09:04",
  },
  {
    id: 2,
    battleId: "172119871671",
    player1: "7JAYM681",
    player2: "EYMR7331",
    amount: 200,
    status: "COMPLETED",
    statusColor: "text-primary",
    gameType: "Ludo Classic",
    date: "17 / 07 / 2024 12:15:16",
  },
  {
    id: 3,
    battleId: "172119884887",
    player1: "7JAYM681",
    player2: "EYMR7331",
    amount: 200,
    status: "RUNNING",
    statusColor: "text-accent",
    gameType: "Ludo Classic",
    date: "17 / 07 / 2024 12:17:28",
  },
  {
    id: 4,
    battleId: "172120355534",
    player1: "sd",
    player2: "Waiting for Player",
    amount: 50,
    status: "NEW",
    statusColor: "text-destructive",
    gameType: "Ludo Classic 2",
    date: "17 / 07 / 2024 13:35:55",
  },
];

const Dashboard = () => {
  const {
    adminSettingData,
    blockUsers,
    successMessage,
    rechargeAllData,
    withdraDataAll,
    errorMessage,
    runningBattleData,
    battleResultData,
    adminSettingDataGame,
    allUserData,
    loader,
  } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  console.log("adminsettingDta1", adminSettingData);

  useEffect(() => {
    dispatch(adminAllUsers());
    dispatch(adminRunningBattle());
    dispatch(adminBlockUser());
    dispatch(adminSetting());
    dispatch(adminBattleResult());
    dispatch(adminRechargeAll());
    dispatch(adminWithdrawAll());
  }, [dispatch, rechargeAllData?.length, withdraDataAll?.length]);

  const today = new Date().toISOString().split("T")[0];
  const todayuser = allUserData?.filter(
    (user) => new Date(user.createAt).toISOString().split("T")[0] === today
  );
  const todayuserCount = todayuser?.length || 0;

  let totalAmount = allUserData?.reduce((acc, item) => acc + item.money, 0);
  let gameStatusCounts = 0;
  if (Array.isArray(adminSettingData)) {
    gameStatusCounts =
      adminSettingData[0]?.game?.reduce((acc, game) => {
        if (game.gstatus == 1) {
          acc[game.gstatus] = (acc[game.gstatus] || 0) + 1;
        }
        return acc;
      }, {}) || {};
  }
  let gameStatusCounts2 = 0;
  if (Array.isArray(adminSettingData)) {
    gameStatusCounts2 =
      adminSettingData[0]?.game?.reduce((acc, game) => {
        if (game.gstatus == 2) {
          acc[game.gstatus] = (acc[game.gstatus] || 0) + 1;
        }
        return acc;
      }, {}) || {};
  }

  // count commission
  const totalAmounts = battleResultData?.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const totalRecieve = battleResultData?.reduce(
    (acc, item) => acc + item.recieve,
    0
  );
  const totalCommission = totalRecieve - totalAmounts;

  // Filter data for today's date
  let todayBattles = 0;

  if (Array.isArray(battleResultData)) {
    const today = new Date();
    const todayLocalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split("T")[0];
  
    todayBattles = battleResultData.filter((battle) => {
      const battleDate = new Date(battle.createdAt).toISOString().split("T")[0];
      return battleDate === todayLocalDate;
    });
  }
  
  

  // Sum up the amount and recieve for today's date
  let todayTotalAmount = 0;
  let todayTotalRecieve = 0;
  if (Array.isArray(todayBattles)) {
    todayTotalAmount = todayBattles.reduce(
      (acc, battle) => acc + battle.amount,
      0
    );
    todayTotalRecieve = todayBattles.reduce(
      (acc, battle) => acc + battle.recieve,
      0
    );
  }

  const todayTotalCommission =  2*todayTotalAmount-todayTotalRecieve ;

  // total recharge
  const filteredRechargeData = rechargeAllData?.filter(
    (item) =>
      item.status === 1 &&
      new Date(item.createdAt).toISOString().split("T")[0] === today
  );
  const totalAmountRecharge = filteredRechargeData?.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // total recharge
  const filteredWithdrawData = withdraDataAll?.filter(
    (item) =>
      item.status == 1 &&
      new Date(item.createdAt).toISOString().split("T")[0] === today
  );
  const totalAmountWithdraw = filteredWithdrawData?.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div className=" bg-card text-card-foreground w-[100%]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
            {/* <button className="bg-[#4e73df] text-white px-6 py-2 rounded-sm">
              Generate Report
            </button> */}
          </div>
          <div className="bg-white text-popover-foreground p-2 rounded-lg shadow sm:w-[330px] md:w-[100%]">
            <div className="mb-4 ">
              <button className="text-primary border-b-2 border-primary pb-1">
                Running Tables
              </button>
            </div>
            <div className="table-container overflow-x-auto ">
              <table className="w-full  text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2">#</th>
                    <th className="py-2">Battle ID</th>
                    <th className="py-2">Player 1</th>
                    <th className="py-2">Player 2</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Game Type</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(runningBattleData) &&
                    runningBattleData?.map((battle, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2 flex items-center">
                          <img
                            src={sword}
                            alt="sword-icon"
                            className="mr-2 w-[20px]"
                          />
                          {battle.battleId}
                        </td>
                        <td className="py-2">{battle.name}</td>
                        <td className="py-2">{battle.acceptedBy[0].name}</td>
                        <td className="py-2 flex items-center">
                          <img
                            src={money}
                            alt="money-icon"
                            className="mr-2 w-[20px]"
                          />
                          {battle.amount}
                        </td>
                        <td className={`py-2 ${battle.statusColor}`}>
                          {battle.betstatus == 1 ? "RUNNING" : "COMPLETED"}
                        </td>
                        <td className="py-2">{battle.type}</td>
                        <td className="py-2 flex items-center">
                          <CiClock2 />
                          {formatDate(battle.createdAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-1 mt-[20px] md:grid-cols-4 gap-4 p-1">
            <div className="bg-white py-6 px-3 border-l-[5px] border-[red] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[red]">Total Users</h3>
                  <p className="text-2xl font-bold">{allUserData?.length}</p>
                </div>
                <ImUsers className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#1cc88a] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#1cc88a]">Total Users Wallet Balance</h3>
                  <p className="text-2xl font-bold text-primary">
                    ₹ {totalAmount}
                  </p>
                </div>
                <FaRupeeSign className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[red] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[red]">Today New Users</h3>
                  <p className="text-2xl font-bold">{todayuserCount}</p>
                </div>
                <IoMdCalendar className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#4e73df] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#4e73df]">Total Blocked Users</h3>
                  <p className="text-2xl font-bold">{blockUsers?.length}</p>
                </div>
                <ImBlocked className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#f6c23e] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#f6c23e]">Today Game</h3>
                  <p className="text-2xl font-bold text-destructive">0</p>
                </div>
                <FaGamepad className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#4e73df] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#4e73df]">All Game</h3>
                  <p className="text-2xl font-bold">
                    {Array.isArray(adminSettingData)
                      ? adminSettingData[0]?.game?.length
                      : 0}
                  </p>
                </div>
                <MdGamepad className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#f6c23e] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#f6c23e]">Total Success Game</h3>
                  <p className="text-2xl font-bold">{gameStatusCounts[1]}</p>
                </div>
                <FaTrophy className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#1cc88a] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#1cc88a]">Total Cancel Game</h3>
                  <p className="text-2xl font-bold">{gameStatusCounts2[2]}</p>
                </div>
                <MdIncompleteCircle className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#4e73df] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#4e73df]">Total Admin Commission</h3>
                  {/* <p className="text-2xl font-bold">₹{totalCommission}</p> */}
                  <p className="text-2xl font-bold">
                    ₹{" "}
                    {Array.isArray(adminSettingData)
                      ? adminSettingData[0]?.money
                      : 0}
                  </p>
                </div>
                <RiCashFill className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[red] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[red]">Today Admin Commission</h3>
                  <p className="text-2xl font-bold">₹{todayTotalCommission}</p>
                </div>
                <RiCashFill className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#1cc88a] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#1cc88a]">Today Total Deposit</h3>
                  <p className="text-2xl font-bold">₹{totalAmountRecharge}</p>
                </div>
                <RiLuggageDepositFill className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#f6c23e] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#f6c23e]">Today Total Withdraw</h3>
                  <p className="text-2xl font-bold text-destructive">
                    ₹{totalAmountWithdraw}
                  </p>
                </div>
                <BsCashCoin className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#1cc88a] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#1cc88a]">Today Won Amount</h3>
                  <p className="text-2xl font-bold">₹0</p>
                </div>
                <RiCashFill className="text-[2rem] font-extrabold text-[gray]" />
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[#4e73df] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#4e73df]">Total Pending KYC</h3>
                  <p className="text-2xl font-bold text-accent">0</p>
                </div>
                <BsCashCoin className="text-[2rem] font-extrabold text-[gray]" />{" "}
              </div>
            </div>
            <div className="bg-white py-6 px-3 border-l-[5px] border-[red] rounded-[3px] shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[red]">Total Approved KYC</h3>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <BsCashCoin className="text-[2rem] font-extrabold text-[gray]" />{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
