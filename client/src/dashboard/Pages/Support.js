import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSetting, adminTelegram } from "../../store/reducer/adminReducer";

const Support = () => {
  const { adminSettingData, successMessage, errorMessage } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const [supports, setSupports] = useState("");
  const [supports1, setSupports1] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
    dispatch(adminTelegram({ supports, supports1 }))
      .then(() => {
        alert(successMessage);
        dispatch(adminSetting());
      })
      .catch(() => {
        alert(errorMessage);
      });
    setShowPopup(false);
  };

  useEffect(() => {
    dispatch(adminSetting());
    if (Array.isArray(adminSettingData) && adminSettingData) {
      setSupports(adminSettingData[0]?.telegram);
    }
  }, [dispatch]);

  return (
    <div className="w-[100%]">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Support</h2>
        <div className="overflow-x-auto sm:w-[300px] md:w-[100%]">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#c4c4c4] border">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Telegram Link</th>
                <th className="py-2 px-4 text-left">Whatsapp Number</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4"> 1</td>

                <td className="py-2 px-4">{supports}</td>
                <td className="py-2 px-4">{supports1}</td>
                <td className="py-2 px-4">Edit</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                    onClick={() => handleEditClick()}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg md:w-[500px] sm:w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Edit Support</h2>

            <div className="mb-4">
              <label className="block text-gray-700">
                Enter Your Support Telegram Link
              </label>
              <input
                type="text"
                name="message"
                value={supports}
                onChange={(e) => setSupports(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Enter Your Support Whatsapp Number
              </label>
              <input
                type="Number"
                name="message"
                value={supports1}
                onChange={(e) => setSupports1(e.target.value)}
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
