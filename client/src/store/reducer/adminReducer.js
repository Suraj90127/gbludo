// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./api";

export const adminAllUsers = createAsyncThunk(
  "admin/all-users",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/all-users", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminViewUser = createAsyncThunk(
  "admin/view-user",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/user/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminViewUserBank = createAsyncThunk(
  "admin/view-user-bank",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/user-bank/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminViewUserTransaction = createAsyncThunk(
  "admin/view-user-transaction",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/user-transaction/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminViewUserTransactionHistory = createAsyncThunk(
  "admin/view-user-transaction-history",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/user-transaction-history/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminViewUserBetHistory = createAsyncThunk(
  "admin/view-user-bet-history",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/user-bet-history/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminBlockUser = createAsyncThunk(
  "admin/block-user",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/block-users`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminGetKyc = createAsyncThunk(
  "admin/get-kyc",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-kyc/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminPendingKyc = createAsyncThunk(
  "admin/pending-kyc",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/pending-kyc`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminSuccessKyc = createAsyncThunk(
  "admin/success-kyc",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/success-kyc`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminApproveKyc = createAsyncThunk(
  "admin/approve-kyc",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/approve-kyc/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRejectedKyc = createAsyncThunk(
  "admin/rejected-kyc",
  async (id, { rejectWithValue, fulfillWithValue }) => {
   
    try {
      const { data } = await api.get(`/admin/rejected-kyc/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminUpdateUserStatus = createAsyncThunk(
  "admin/update-user",
  async ({ id, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/user-status/${id}`,
        { status: status },
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminKycDetails = createAsyncThunk(
  "admin/kyc-details",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-kyc-details/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminKycAll = createAsyncThunk(
  "admin/kyc-alls",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-kyc-all`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminNewBattle = createAsyncThunk(
  "admin/new-battle",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/new-battle`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminNewBattleDelete = createAsyncThunk(
  "admin/new-battle-delete",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/admin/new-battle-delete/${id}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRunningBattle = createAsyncThunk(
  "admin/running-battle",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/running-battle`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminBattleResult = createAsyncThunk(
  "admin/battle-result",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/battle-result`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminBattleView = createAsyncThunk(
  "admin/battle-view",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/battle-view/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminBattleUpdate = createAsyncThunk(
  "admin/battle-update",
  async ({ id, name }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/battle-update/${id}`,
        { name: name },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminBattleRecieve = createAsyncThunk(
  "admin/battle-reciev",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/battle-recieve`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const cancelBet = createAsyncThunk(
  "admin/battle-cancel",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/battle-cancel`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRecharge = createAsyncThunk(
  "admin/recharge",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/recharge`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRechargeAll = createAsyncThunk(
  "admin/recharge-all",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/recharge-all`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminRechargeApprove = createAsyncThunk(
  "admin/recharge-approve",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/recharge-approve/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRechargeReject = createAsyncThunk(
  "admin/recharge-reject",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/recharge-cancle/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminWithdraw = createAsyncThunk(
  "admin/withdraw",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/withdrawal`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminWithdrawAll = createAsyncThunk(
  "admin/withdraw-all",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/withdrawal-all`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminWithdrawApprove = createAsyncThunk(
  "admin/withdraw-approve",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/withdrawal-approve/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminWithdrawReject = createAsyncThunk(
  "admin/withdraw-reject",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/withdrawal-cancle/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminSetting = createAsyncThunk(
  "admin/setting",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/admin-setting`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminSetUPI = createAsyncThunk(
  "admin/set-upi",
  async ({ upi, name }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/admin/set-upi`,
        { upi: upi, name: name },
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminSetCommission = createAsyncThunk(
  "admin/set-commission",
  async ({ batt1, batt0, refer }, { rejectWithValue, fulfillWithValue }) => {
    console.log("ggg", batt1, batt0, refer);
    try {
      const { data } = await api.post(
        `/admin/set-commission`,
        {
          battleCommission1: batt1,
          battleCommission0: batt0,
          referralCommission: refer,
        },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminTelegram = createAsyncThunk(
  "admin/set-telegram",
  async (telegram, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/admin/set-telegram`,
        { telegram: telegram },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminSignUpBonus = createAsyncThunk(
  "admin/set-sign-up",
  async (signUpBonus, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/admin/set-bonus`,
        { signUpBonus: signUpBonus },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminMarquee = createAsyncThunk(
  "admin/set-marquee",
  async ({ marquee, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/admin/set-marquee`,
        { marquee: marquee, marqueestatus: status },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminGames = createAsyncThunk(
  "admin/set-game",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log("object", formData);
      const { data } = await api.post(`/admin/set-game`, formData, {
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
export const adminGamesUpdate = createAsyncThunk(
  "admin/game-update",
  async ({ id, formData }, { rejectWithValue, fulfillWithValue }) => {
    console.log("object", id);
    try {
      const { data } = await api.put(`/admin/update-game/${id}`, formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminGamesDelete = createAsyncThunk(
  "admin/game-delete",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/admin/delete-game/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminGamesView = createAsyncThunk(
  "admin/game-view",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/veiw-game/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminRefund = createAsyncThunk(
  "admin/refund",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/battle-refund/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminPenalty = createAsyncThunk(
  'admin/penalty',
  async ({id,moneyss,type}, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.put(`/admin/penalty/${id}`,{money:moneyss,type:type},{ withCredentials: true })

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const adminDeleteKyc = createAsyncThunk(
  'admin/delete-kyc',
  async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.delete(`admin/delete-kyc/${id}`,{ withCredentials: true })

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const adminReducer = createSlice({
  name: "admin",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    adminData: null, // add adminDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    admin_reset: (state) => {
      state.adminData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminAllUsers.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminAllUsers.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminAllUsers.fulfilled, (state, { payload }) => {
        const allUserData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.allUserData = allUserData;
      })

      .addCase(adminViewUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminViewUser.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminViewUser.fulfilled, (state, { payload }) => {
        const adminviewUserdata = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminviewUserdata = adminviewUserdata;
      })

      .addCase(adminViewUserBank.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminViewUserBank.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminViewUserBank.fulfilled, (state, { payload }) => {
        const adminviewUserBankdata = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminviewUserBankdata = adminviewUserBankdata;
      })
      .addCase(adminViewUserBetHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminViewUserBetHistory.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminViewUserBetHistory.fulfilled, (state, { payload }) => {
        const userBetHistory = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userBetHistory = userBetHistory;
      })
      .addCase(adminViewUserTransaction.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminViewUserTransaction.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminViewUserTransaction.fulfilled, (state, { payload }) => {
        const adminUserTransaction = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminUserTransaction = adminUserTransaction;
      })
      .addCase(adminViewUserTransactionHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(
        adminViewUserTransactionHistory.rejected,
        (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || "An error occurred";
          state.loader = false;
        }
      )
      .addCase(
        adminViewUserTransactionHistory.fulfilled,
        (state, { payload }) => {
          const adminUserTransactionHistorys = payload.data;
          state.successMessage = payload.message;
          state.loader = false;
          state.adminUserTransactionHistorys = adminUserTransactionHistorys;
        }
      )

      .addCase(adminBlockUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminBlockUser.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminBlockUser.fulfilled, (state, { payload }) => {
        const blockUsers = payload.data;

        state.successMessage = payload.message;
        state.loader = false;
        state.blockUsers = blockUsers;
      })

      .addCase(adminGetKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminGetKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminGetKyc.fulfilled, (state, { payload }) => {
        const userKyc = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userKyc = userKyc;
      })

      .addCase(adminPendingKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminPendingKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminPendingKyc.fulfilled, (state, { payload }) => {
        const userKycPending = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userKycPending = userKycPending;
      })
      .addCase(adminSuccessKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminSuccessKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminSuccessKyc.fulfilled, (state, { payload }) => {
        const userKycSuccess = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userKycSuccess = userKycSuccess;
      })
      .addCase(adminApproveKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminApproveKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminApproveKyc.fulfilled, (state, { payload }) => {
        const userKycApprove = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userKycApprove = userKycApprove;
      })
      .addCase(adminRejectedKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRejectedKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRejectedKyc.fulfilled, (state, { payload }) => {
        const userKycReject = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userKycReject = userKycReject;
      })
      .addCase(adminKycDetails.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminKycDetails.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminKycDetails.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        const userKycDetails = payload.data;
        state.userKycDetails = userKycDetails;
        const userKycDetails1 = payload.data1;
        state.userKycDetails1 = userKycDetails1;
        const userKycDetails2 = payload.data2;
        state.userKycDetails2 = userKycDetails2;
      })
      .addCase(adminKycAll.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminKycAll.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminKycAll.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
        const allkycData = payload.data;
        state.allkycData = allkycData;
      })

      .addCase(adminUpdateUserStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminUpdateUserStatus.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminUpdateUserStatus.fulfilled, (state, { payload }) => {
        const allUserData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.allUserData = allUserData;
      })

      .addCase(adminNewBattle.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminNewBattle.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminNewBattle.fulfilled, (state, { payload }) => {
        const newBattleData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.newBattleData = newBattleData;
      })

      .addCase(adminNewBattleDelete.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminNewBattleDelete.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminNewBattleDelete.fulfilled, (state, { payload }) => {
        const newBattleData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.newBattleData = newBattleData;
      })
      .addCase(adminRunningBattle.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRunningBattle.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRunningBattle.fulfilled, (state, { payload }) => {
        const runningBattleData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.runningBattleData = runningBattleData;
      })

      .addCase(adminBattleResult.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminBattleResult.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminBattleResult.fulfilled, (state, { payload }) => {
        const battleResultData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.battleResultData = battleResultData;
      })
      .addCase(adminBattleView.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminBattleView.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminBattleView.fulfilled, (state, { payload }) => {
        const battleViewData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.battleViewData = battleViewData;
      })
      .addCase(adminBattleUpdate.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminBattleUpdate.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminBattleUpdate.fulfilled, (state, { payload }) => {
        const battleViewData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.battleViewData = battleViewData;
      })

      .addCase(adminBattleRecieve.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminBattleRecieve.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminBattleRecieve.fulfilled, (state, { payload }) => {
        const battleRecieveData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.battleRecieveData = battleRecieveData;
      })
      .addCase(cancelBet.pending, (state) => {
        state.loader = true;
      })
      .addCase(cancelBet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(cancelBet.fulfilled, (state, { payload }) => {
        const cancelBetData = payload.data;
        state.loader = false;
        state.cancelBetData = cancelBetData;
      })

      .addCase(adminRecharge.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRecharge.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRecharge.fulfilled, (state, { payload }) => {
        const rechargeData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeData = rechargeData;
      })

      .addCase(adminRechargeAll.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRechargeAll.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRechargeAll.fulfilled, (state, { payload }) => {
        const rechargeAllData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeAllData = rechargeAllData;
      })
      .addCase(adminRechargeApprove.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRechargeApprove.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRechargeApprove.fulfilled, (state, { payload }) => {
        const rechargeAllData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeAllData = rechargeAllData;
      })
      .addCase(adminRechargeReject.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRechargeReject.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRechargeReject.fulfilled, (state, { payload }) => {
        const rechargeAllData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeAllData = rechargeAllData;
      })
      .addCase(adminWithdraw.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminWithdraw.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminWithdraw.fulfilled, (state, { payload }) => {
        const withdrawData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdrawData = withdrawData;
      })
      .addCase(adminWithdrawAll.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminWithdrawAll.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminWithdrawAll.fulfilled, (state, { payload }) => {
        const withdraDataAll = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdraDataAll = withdraDataAll;
      })
      .addCase(adminWithdrawApprove.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminWithdrawApprove.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminWithdrawApprove.fulfilled, (state, { payload }) => {
        const withdraDataAll = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdraDataAll = withdraDataAll;
      })
      .addCase(adminWithdrawReject.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminWithdrawReject.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminWithdrawReject.fulfilled, (state, { payload }) => {
        const withdraDataAll = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdraDataAll = withdraDataAll;
      })
      .addCase(adminSetting.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminSetting.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminSetting.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminSetUPI.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminSetUPI.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminSetUPI.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminSetCommission.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminSetCommission.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminSetCommission.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminTelegram.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminTelegram.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminTelegram.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminSignUpBonus.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminSignUpBonus.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminSignUpBonus.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminMarquee.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminMarquee.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminMarquee.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminGames.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminGames.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminGames.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminGamesUpdate.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminGamesUpdate.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminGamesUpdate.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })
      .addCase(adminGamesDelete.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminGamesDelete.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminGamesDelete.fulfilled, (state, { payload }) => {
        const adminSettingData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingData = adminSettingData;
      })

      .addCase(adminGamesView.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminGamesView.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminGamesView.fulfilled, (state, { payload }) => {
        const adminSettingDataGame = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminSettingDataGame = adminSettingDataGame;
      })
      .addCase(adminRefund.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminRefund.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(adminRefund.fulfilled, (state, { payload }) => {
        const adminRefunddata = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminRefunddata = adminRefunddata;
      })
      .addCase(adminPenalty.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminPenalty.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || 'An error occurred';
        state.loader = false;
      })
      .addCase(adminPenalty.fulfilled, (state, { payload }) => {
        const adminviewUserdata = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.adminviewUserdata = adminviewUserdata;
      })
      .addCase(adminDeleteKyc.pending, (state) => {
        state.loader = true;
      })
      .addCase(adminDeleteKyc.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || 'An error occurred';
        state.loader = false;
      })
      .addCase(adminDeleteKyc.fulfilled, (state, { payload }) => {
        const admindeletekycdata = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.admindeletekycdata = admindeletekycdata;
      })
  },
});

export const { messageClear, admin_reset } = adminReducer.actions;
export default adminReducer.reducer;
