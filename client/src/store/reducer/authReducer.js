// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { api } from "./api";

export const sendOtp = createAsyncThunk(
  "auth/otp",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/send-otp", info);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/login", info);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 5);
      
      // Set the cookie with the specified expiration date
      Cookies.set("token", data.user.token, {
        secure: true,
        sameSite: "None",
        expires: expirationDate
      });
   
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadToken = createAsyncThunk(
  "auth/loadtoken",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get("/user-auth", { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get("/me", { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument
    console.log("reducer", info);
    try {
      const { data } = await api.put(
        `/update-profile`,
        { name: info },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const withdrawal = createAsyncThunk(
  "auth/withdrawal",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/withdrawal`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const withdrawalHistory = createAsyncThunk(
  "auth/withdrawal-history",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get(`/withdrawal/history`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const transactionHistory = createAsyncThunk(
  "auth/transaction-history",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get(`/transaction-history`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const kyc = createAsyncThunk(
  "auth/kyc",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.post(`/kyc`, info, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getKyc = createAsyncThunk(
  "auth/get-kyc",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get(`/get-kyc`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReferralCommission = createAsyncThunk(
  "auth/get-referral-commission",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // fixed the argument

    try {
      const { data } = await api.get(`/get-referral-commission`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const transferReferralCommission = createAsyncThunk(
  'auth/transfer-referral-commission',
  async (money, { rejectWithValue, fulfillWithValue }) => { // fixed the argument
  
    try {
      const { data } = await api.post(`/transfer-referral-commission`,{money:money},{ withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: localStorage.getItem("token"),
    errorMessage: "",
    successMessage: "",
    userDetail: null, // add userDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loader = true;
      })
      .addCase(sendOtp.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(sendOtp.fulfilled, (state, { payload }) => {
        const userInfo = payload.token;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(login.pending, (state) => {
        state.loader = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const userInfo = payload.token;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(getUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        // console.log('GetUser rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const userDetail = payload.user; // Assume user detail is in payload.user

        state.successMessage = payload.message;
        state.loader = false;
        state.userDetail = userDetail;
        // console.log("dfstate.userDetail",state.userDetail)
      })
      .addCase(loadToken.pending, (state) => {
        state.loader = true;
      })
      .addCase(loadToken.rejected, (state, { payload }) => {
        // console.log('GetUser rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(loadToken.fulfilled, (state, { payload }) => {
        const userload = payload; // Assume user detail is in payload.user

        state.successMessage = payload.message;
        state.loader = false;
        state.userload = userload;
        // console.log("dfstate.userDetail",state.userDetail)
      })
      .addCase(updateProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        const userDetail = payload.user;
        state.successMessage = payload.message;
        state.loader = false;
        state.userDetail = userDetail;
        // console.log("state.userDetail", state.userDetail); // Ensure this logs correctly
      })

      // .addCase(withdrawal.pending, (state) => {
      //   state.loader = true;
      // })
      // .addCase(withdrawal.rejected, (state, { payload }) => {
      //   state.errorMessage = payload?.error || "An error occurred";
      //   state.loader = false;
      // })
      // .addCase(withdrawal.fulfilled, (state, { payload }) => {
      //   const withdrawals = payload.data;
      //   state.successMessage = payload.message;
      //   state.loader = false;
      //   state.withdrawals = withdrawals;
      //   // console.log("state.userDetail", state.userDetail); // Ensure this logs correctly
      // })
      .addCase(withdrawal.pending, (state) => {
        state.loader = true;
      })
      .addCase(withdrawal.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || "An error occurred";
        state.loader = false;
      })
      .addCase(withdrawal.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        state.withdrawals = payload.data;
      })
      .addCase(withdrawalHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(withdrawalHistory.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(withdrawalHistory.fulfilled, (state, { payload }) => {
        const withdrawalHistoryData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdrawalHistoryData = withdrawalHistoryData;
      })
      .addCase(transactionHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(transactionHistory.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(transactionHistory.fulfilled, (state, { payload }) => {
        const transactionHistoryData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.transactionHistoryData = transactionHistoryData;
      })
      .addCase(kyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(kyc.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(kyc.fulfilled, (state, { payload }) => {
        const kycData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.kycData = kycData;
      })
      .addCase(getKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(getKyc.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(getKyc.fulfilled, (state, { payload }) => {
        const kycData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.kycData = kycData;
      })
      .addCase(getReferralCommission.pending, (state) => {
        state.loader = true;
      })
      .addCase(getReferralCommission.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(getReferralCommission.fulfilled, (state, { payload }) => {
        const referralCommissions = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.referralCommissions = referralCommissions;
      })
      .addCase(transferReferralCommission.pending, (state) => {
        state.loader = true;
      })
      .addCase(transferReferralCommission.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || 'An error occurred';
        state.loader = false;
      })
      .addCase(transferReferralCommission.fulfilled, (state, { payload }) => {
        const referralCommissions = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.referralCommissions = referralCommissions;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
