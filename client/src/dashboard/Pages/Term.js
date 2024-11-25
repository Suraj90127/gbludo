import React, { useState } from 'react';

const Support = () => {
  const initialSupports = [
    { id: '1234567890', message: 'Term', status: 'Edit' },
    { id: '1234567891', message: 'Privacy', status: 'Edit' },
    // Add more support messages as needed
  ];

  const [supports, setSupports] = useState(initialSupports);
  const [showPopup, setShowPopup] = useState(false);
  const [currentSupport, setCurrentSupport] = useState({ id: '', message: '', status: '' });

  const handleEditClick = (support) => {
    setCurrentSupport(support);
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupport({ ...currentSupport, [name]: value });
  };

  const handleSubmit = () => {
    setSupports(supports.map(s => (s.id === currentSupport.id ? currentSupport : s)));
    setShowPopup(false);
  };

  return (
    <div className="w-[100%]">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Term & Privacy Policy</h2>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#c4c4c4] border">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {supports.map((support, index) => (
                <tr key={support.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{support.id}</td>
                  <td className="py-2 px-4">{support.message}</td>
                  <td className="py-2 px-4">{support.status}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded"
                      onClick={() => handleEditClick(support)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg md:w-[500px] sm:w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Edit Support</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Support No</label>
              <input
                type="text"
                name="id"
                value={currentSupport.id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Support Type</label>
              <input
                type="text"
                name="message"
                value={currentSupport.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
