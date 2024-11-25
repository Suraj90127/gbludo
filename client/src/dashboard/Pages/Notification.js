import React from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  return (
    <div className="p-4 w-[100%]">
                  <h1 className="text-2xl font-semibold mb-4">Notification</h1>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-primary font-semibold">ALL Notifications</p>
                      <Link to="/add-notification"><button className="bg-[#4e73df] text-white px-4 py-2 rounded-lg flex items-center">
                        {/* <img undefinedhidden="true" alt="plus-icon" src="https://openui.fly.dev/openui/24x24.svg?text=+" className="mr-2" /> */}
                        Add notification
                      </button></Link>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      
                      <div>
                        <label htmlFor="search" className="mr-2">Search:</label>
                        <input id="search" type="text" className="border border-input rounded p-1" />
                      </div>
                    </div>
                    <table className="min-w-full bg-white border border-border rounded-lg">
                      <thead>
                        <tr>
                          <th className="border border-border p-2">#</th>
                          <th className="border border-border p-2">ID</th>
                          <th className="border border-border p-2">Message</th>
                          <th className="border border-border p-2">Status</th>
                          <th className="border border-border p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-2">1</td>
                          <td className="border border-border p-2">9</td>
                          <td className="border border-border p-2">Hi</td>
                          <td className="border border-border p-2 text-green-500">Active</td>
                          <td className="border border-border p-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button>
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">2</td>
                          <td className="border border-border p-2">1</td>
                          <td className="border border-border p-2">Coming soon</td>
                          <td className="border border-border p-2 text-green-500">Active</td>
                          <td className="border border-border p-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button>
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>
  )
}

export default Notification
