import React, { useState } from 'react'
import { MdHistory } from "react-icons/md";
import money from './Assets/global-rupeeIcon.png'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Wallet = () => {
  const { userDetail } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 space-y-4 mt-[60px]">
          <div className="flex items-center justify-center p-4 bg-card rounded-lg shadow-md">
            <Link to="/transaction">
            <div className="flex justify-center items-center space-x-2">
            <MdHistory className='text-[2rem]' />
              <span className="text-foreground font-bold text-[1.2rem]">Order History</span>
            </div>
            </Link>
          </div>
        
          <div className="p-4 bg-[#dc3545] text-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img undefinedhidden="true" alt="cash-icon" className="h-[30px]" src={money} />
                <span className="text-lg font-bold">₹ {userDetail?.money?.toFixed(2)}</span>
              </div>
            <Link to="/add-fund"><button className="px-4 py-1 bg-[transparent] border border-white text-white rounded  ">Add Cash</button></Link>
            </div>
            <div className="font-bold">Total Cash</div>
            <p className="text-muted-foreground mt-5 text-[0.8rem]">
              Can not be withdrawn to bank.
              <br />
              Can be used to play Tournament & Battles.
            </p>
          </div>
        
          <div className="p-4 bg-[#4782f4] text-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img undefinedhidden="true" alt="cash-icon" src={money} className="h-[30px]" />
                <span className="text-lg font-bold">₹ {(userDetail?.money-userDetail?.cashwon).toFixed(2)}</span>
              </div>
              <Link to="/withdraw"><button className="px-4 py-1 bg-[transparent] border border-white text-white rounded ">Withdraw</button></Link>
            </div>
            <div className="font-bold">Winnings Cash</div>
            <p className="text-muted-foreground mt-5 text-[0.8rem]">
              Can be withdrawn to Bank.
              <br />
              Can be used to play Tournaments & Battles.


            </p>
          </div>
        </div>
  )
}

export default Wallet
