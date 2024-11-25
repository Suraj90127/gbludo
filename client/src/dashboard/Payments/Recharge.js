import React from 'react'

const Recharge = () => {
  return (
    <div className="w-[100%]">
      <div className="p-6 bg-white shadow-md rounded-lg">
              <h1 className="text-2xl font-semibold text-foreground mb-4">Players</h1>
              <div className="bg-popover p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-primary mb-4">Recharge Wallet of "0123456789"</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-1/3 text-muted-foreground">UserID</label>
                    <span className="text-foreground">EYMR7331</span>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-muted-foreground">Mobile No.</label>
                    <span className="text-foreground">0123456789</span>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-muted-foreground">Amount to be Add</label>
                    <input type="number" value="0" className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-[blue] text-[white] px-4 py-2 rounded-sm">Recharge Balance</button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Recharge
