import React from 'react'

const AddGame = () => {
  return (
    <div className="w-[100%]">
       <div className=" p-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Add Game</h2>
                  <div className="border-b border-border mb-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">GAME CREATE</h3>
                  </div>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                      <input type="text" id="name" className="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground" placeholder="Enter a name of Game" />
                    </div>
                    <div className="mb-4 bg-gray-100 p-2">
                      <label htmlFor="image" className="block text-sm font-medium text-foreground">Image</label>
                      <input type="file" id="image" className="mt-1 block w-full text-foreground" />
                      <p className="mt-1 text-sm text-muted-foreground">Image resolution must be 110*110</p>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="api-url" className="block text-sm font-medium text-foreground">API URL</label>
                      <input type="text" id="api-url" className="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground" placeholder="Enter a API URL" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="status" className="block text-sm font-medium text-foreground">Status</label>
                      <select id="status" className="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground">
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div className="flex space-x-4">
                      <button type="submit" className="bg-[#4e73df] text-white hover:bg-primary/80 p-2 rounded-sm">Submit</button>
                    </div>
                  </form>
                  </div>
    </div>
  )
}

export default AddGame
