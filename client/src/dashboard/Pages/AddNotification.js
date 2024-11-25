import React from 'react'

const AddNotification = () => {
  return (
    <div className="md:w-[100%] sm:w-[300px]">
      <div className=" p-6 bg-white shadow-md rounded-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">Add Notification</h2>
              <div className="bg-[#d4d4d4] p-4 rounded-md mb-4">
                <span className="text-primary font-semibold">Notification CREATE</span>
              </div>
              <form>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea id="message" className="w-full p-2 border border-border rounded-md" placeholder="Enter Notification"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-muted-foreground mb-2">
                    Status
                  </label>
                  <select id="status" className="w-full p-2 border border-border rounded-md">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="bg-[blue] text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>
              </form>
            </div>
    </div>
  )
}

export default AddNotification
