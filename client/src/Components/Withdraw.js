import React from 'react'
import { Link } from 'react-router-dom';
import upi from './Assets/upi_logo_icon_169316.webp'
import bank from './Assets/Bank-PNG-File.png'

const Withdraw = () => {
  return (
    <div className="mt-[70px]">
      <div className="max-w-md mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold mb-6 text-start">Choose Withdrawal Option</h2>
          <Link to="/upi"><div className="border border-border rounded-lg p-4 mb-6 flex items-center bg-[#f7f7f7] hover:text-secondary-foreground transition-colors duration-300 cursor-pointer">
            <img src={upi} alt="UPI logo" className="mr-4 w-[50px] rounded-full " />
            <div>
              <h3 className="font-semibold text-lg">Withdraw through UPI</h3>
              <p className="text-sm text-[#f3cd23]">Minimum withdrawal amount ₹95</p>
            </div>
          </div></Link>
          <Link to="/bank"><div className="border border-border rounded-lg p-4 flex items-center bg-[#f7f7f7] hover:text-secondary-foreground transition-colors duration-300 cursor-pointer">
            <img src={bank} alt="Bank logo" className="mr-4 w-[50px] rounded-full" />
            <div>
              <h3 className="font-semibold text-lg">Bank Transfer</h3>
              <p className="text-sm text-[#f3cd23]">Minimum withdrawal amount ₹95</p>
              <p className="text-sm text-[#f13a22]">Direct Bank Transaction will take 1-2 hours</p>
            </div>
          </div></Link>
        </div>
    </div>
  )
}

export default Withdraw
