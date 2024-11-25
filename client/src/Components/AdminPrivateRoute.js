import React , { useState, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "../store/reducer/authReducer";
import axios from "axios";
import { api } from "../store/reducer/api";
export default function AdminPrivateRoute() {
    const [ok, setOk] = useState(true);
const [user,setUser]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleApi=async()=>{
        try {
            const data=await api.get("/admin-auth",{ withCredentials: true })
setUser(data.data)
        } catch (error) {
            
        }
    }
    console.log("dd",ok,"fff",user)
    useEffect(() => {
        handleApi()
        const interval = setInterval(() => {
                          
                if (user?.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
        
        }, 1000);
     

        return () => clearInterval(interval);
    }, [user?.length]);

    return ok ? <Outlet /> : <Spinner />;
}