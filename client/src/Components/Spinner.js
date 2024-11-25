import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "./Assets/logo.png";
import Cookies from "js-cookie";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetail } = useSelector((state) => state.auth);
  
  useEffect(() => {
      const interval = setInterval(() => {
          setCount((prevValue) => --prevValue);
      }, 1000);
      if(userDetail){
          navigate({
              state: location.pathname,
          });
      }
      if(count <=-1 ){
        Cookies.remove("token");
        localStorage.removeItem("token");
      }
      count === 0 &&
          navigate(`/${path}`, {
              state: location.pathname,
          });
      return () => clearInterval(interval);
  }, [count, navigate, location, path]);
    return (
        <>
        {count !== 0 ?
        <div
      className="my-loader"
            >
<div className='loader loader--spinningDisc'>
  
</div>
<div className="counts text-white">
{count}
</div>
            </div>
        : ""}
        </>
    );
};

export default Spinner;
