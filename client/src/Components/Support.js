import React, { useEffect } from "react";
import img from "./Assets/support.svg";
import watsapp from "./Assets/whatsapp.webp";
import Telegram from "./Assets/telegram.webp";
import "./style.css";
import { Link } from "react-router-dom";
import { adminSetting } from "../store/reducer/adminReducer";
import { useDispatch, useSelector } from "react-redux";

const Support = () => {
  const dispatch = useDispatch();
  const { adminSettingData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminSetting());
  }, []);
 
  return (
    <div className="support">
      <img src={img} alt="" />
      {/* <h3 className="text[0.7rem]">Support timing </h3> */}
      {/* <h3 className="text[0.7rem]">(Monday to Sunday (All time))</h3> */}
      <Link
        className="text-[1.5rem] mt-2"
        to={`https://wa.me/+91${
          Array.isArray(adminSettingData)
            ? adminSettingData[0]?.whatsapp
            : "not found"
        }`}
      >
        <img src={watsapp} alt="" className="w-10"/>
        Chat with us on Whatsapp (Can I help you?)
      </Link>

      <Link
        className="text-[1rem] mt-5"
        to={`https://t.me/${
          Array.isArray(adminSettingData)
            ? adminSettingData[0]?.telegram
            : "not found"
        }`}
      >
        <img src={Telegram} className="mr-1" alt="" />
        Chat with us on Telegram (Can I help you?)
      </Link>
    </div>
  );
};

export default Support;
