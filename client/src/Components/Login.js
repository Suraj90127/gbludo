import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  login,
  messageClear,
  sendOtp,
} from "../store/reducer/authReducer";
import { useLocation, useNavigate } from "react-router";

import axios from "axios";
import ludo from "./Assets/Ludoimage.jpg";
const Login = () => {
  const { userDetail } = useSelector((state) => state.auth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invite = queryParams.get("invite");
  const [state, setState] = useState({
    phone: "",
    password: "",
    invite: invite,
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(state)).then((response) => {
      if (response.payload.success) {
        alert(response.payload.message);
        navigate("/");
      } else {
        alert(response.payload.message);
      }
    });
  };

  useEffect(() => {
    if (userDetail && location.pathname === "/login") {
      navigate("/");
      console.log("User is logged in, redirecting to homepage.");
    } else if (!userDetail && location.pathname !== "/login") {
      console.log("User not found, redirecting to login.");
      navigate("/login");
    }
    dispatch(getUser());
  }, [userDetail, location.pathname, navigate]);

  const handleOtp = (event) => {
    event.preventDefault();
    dispatch(sendOtp(state)).then((response) => {
      if (response.payload.success) {
        alert(response.payload.message);
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <>
      <div
        className="relative flex justify-center items-center min-h-screen object-fill bg-center bg-cover p-2"
        style={{ backgroundImage: `url(${ludo})` }}
      >
        <p className="absolute bottom-2 text-white text-[0.75rem] w-[90%] ml-[1%] text-center">
          By proceeding, you agree to our Terms of Use, Privacy Policy and that
          you are 18 years or older. You are not playing from Assam, Odisha,
          Nagaland, Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
        </p>
        <div className="mt-[-140px] bg-white p-6 rounded-lg shadow-lg w-full max-w-sm ">
          <h2 className="text-center text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Sign in or Sign up
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex">
              <input
                type="number"
                className="w-1/4 p-2 border border-zinc-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91"
                value="+91"
                readOnly
              />
              <input
                type="number"
                className="w-3/4 p-2 border border-zinc-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mobile Number"
                id="phone"
                name="phone"
                onChange={inputHandle}
                value={state.phone}
              />
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter Your Password"
                id="password"
                name="password"
                onChange={inputHandle}
                value={state.password}
                required
              />
              {/* <span
                className="w-14 bg-[#3a86ff] text-white p-2 rounded-lg hover:bg-[#4cc9f0] cursor-pointer absolute right-0 top-0"
                onClick={handleOtp}
              >
                Send
              </span> */}
            </div>
            <button
              type="submit"
              className="w-full bg-[#3a86ff] text-white p-2 rounded-lg hover:bg-[#4cc9f0]"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
