import React from 'react'
import { FaMoneyBillWave, FaHome, FaTrashAlt, FaSword } from 'react-icons/fa';

const PaymentDetail = () => {
  return (
    <div className="w-[100%]">
      <div className="p-4  text-card-foreground rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <h1 className="text-xl text-[blue] font-semibold">Payments View</h1>
                  </div>
                  <a className="text-primary bg-gray-200 p-3  mb-4 block">Payment View</a>
                  <div className="grid bg-white grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Order ID</span>
                          <span>order_2712899935</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Order Token</span>
                          <span></span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount</span>
                          <span className="flex items-center">
                   <FaMoneyBillWave className="mr-2 text-[green] text-[1.3rem]" /> 500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <span className="text-accent">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Created At</span>
                          <span className="flex items-center"> 17 / 07 / 2024 10:51:43</span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-border p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">User Details</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>User</span>
                          <span>4ZHMO128</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mobile</span>
                          <span>9929640818</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email</span>
                          <span></span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verified or, Not</span>
                          <span className="flex items-center font-semibold"> Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default PaymentDetail
