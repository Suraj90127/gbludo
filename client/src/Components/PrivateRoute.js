import React , { useState, useEffect, useMemo } from "react";

import { Outlet } from "react-router-dom";

import Spinner from "./Spinner";

import { api } from "../store/reducer/api";
import { useDispatch, useSelector } from "react-redux";
import { getUser,  } from "../store/reducer/authReducer";
export default function PrivateRoute() {
    const dispatch = useDispatch();
    const { userDetail } = useSelector((state) => state.auth);
    const [ok, setOk] = useState(true);

    // Memoize the userInfo processing to avoid unnecessary computations
    const processedUserInfo = useMemo(() => {
        return userDetail ? userDetail : null;
    }, [userDetail]);

    useEffect(() => {
        if (!processedUserInfo) {
            dispatch(getUser());
        }
    }, [dispatch, processedUserInfo]);

    useEffect(() => {
        setOk(!!processedUserInfo);
    }, [processedUserInfo]);

    return ok ? <Outlet /> : <Spinner />;
}