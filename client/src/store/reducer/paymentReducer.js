// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";
import { api } from "./api";

export const recharge = createAsyncThunk(
  "payment/recharge",
  async (amount, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/recharge",
        { amount: amount },
        { withCredentials: true }
      );
      Cookies.set("orderid", data.data.orderid, {
        secure: true,
        sameSite: "None",
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const recieveOrder = createAsyncThunk(
  "payment/order",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/recharge/order", {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitUtr = createAsyncThunk(
  "payment/ut",
  async (utr, { rejectWithValue, fulfillWithValue }) => {
    console.log("object", utr);
    try {
      const { data } = await api.put(
        `/utr-submit`,
        { utr: utr },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rechargeHistory = createAsyncThunk(
  "payment/history",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/recharge/history", {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    rechargeData: null, // add userDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    recharge_reset: (state) => {
      state.rechargeData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recharge.pending, (state) => {
        state.loader = true;
      })
      .addCase(recharge.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(recharge.fulfilled, (state, { payload }) => {
        const rechargeData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeData = rechargeData;
      })
      .addCase(recieveOrder.pending, (state) => {
        state.loader = true;
      })
      .addCase(recieveOrder.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(recieveOrder.fulfilled, (state, { payload }) => {
        const rechargeData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeData = rechargeData;
      })

      .addCase(submitUtr.pending, (state) => {
        state.loader = true;
      })
      .addCase(submitUtr.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(submitUtr.fulfilled, (state, { payload }) => {
        const rechargeData = payload.data;

        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeData = rechargeData;
      })

      .addCase(rechargeHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(rechargeHistory.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(rechargeHistory.fulfilled, (state, { payload }) => {
        const rechargeHistorys = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeHistorys = rechargeHistorys;
      });
  },
});

export const { messageClear, recharge_reset } = paymentReducer.actions;
export default paymentReducer.reducer;
