import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, transferReferralCommission } from '../store/reducer/authReducer';

const Redeem = () => {
  const [money, setmoney] = useState();

  const handleChange = (e) => {
    setmoney(e.target.value);
  };
const dispatch=useDispatch()
  const handleSubmit = () => {
dispatch(transferReferralCommission(money)).then((res)=>{
    alert(res.payload.message);
    dispatch(getUser());
})
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Redeem</h2>
        <input
          type="number"
          value={money}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter value"
          />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
          Redeem
        </button>
      </div>
    </div>
</>
  );
};

export default Redeem;
