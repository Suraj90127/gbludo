// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';

import { api } from "./api";

export const userBet = createAsyncThunk(
  'bet/userBet',
  async (amount, { rejectWithValue, fulfillWithValue }) => {
  
    try {
      const { data } = await api.post('/create-bet',  {amount:amount},{ withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const betList = createAsyncThunk(
  'bet/betList',
  async (_, { rejectWithValue, fulfillWithValue }) => {
  
    try {
      const { data } = await api.get('/list-bet',{ withCredentials: true })

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const betAccept = createAsyncThunk(
  'bet/betaccept',
  async (info, { rejectWithValue, fulfillWithValue }) => {
  
    try {
      const { data } = await api.post('/accept-bet',  {betId:info},{ withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const betAcceptList = createAsyncThunk(
  'bet/betacceptlist',
  async (_, { rejectWithValue, fulfillWithValue }) => {
  
    try {
      const { data } = await api.get('/accept-bet-list',  { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const betDelete = createAsyncThunk(
  'bet/betdelet',
  async (info, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.delete(`/delet-bet/${info}`,  { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const playBet = createAsyncThunk(
  'bet/betplay',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/play-bet/${info}`,  { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setRoom = createAsyncThunk(
  'bet/setroom',
  async ({ id, room }, { rejectWithValue, fulfillWithValue }) => {
 
    try {
      const { data } = await api.put(`/set-room/${id}`, { room }, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'bet/updatestatus',
  async ({ id, status,description }, { rejectWithValue, fulfillWithValue }) => {
    try {
     
      const formData = new FormData();
      formData.append('status', status);
      formData.append('description', description);
      const { data } = await api.put(`/update-status/${id}`, formData, {headers: {
        'Content-Type': 'multipart/form-data',
      }, withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const betHistory = createAsyncThunk(
  'bet/bethistory',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
     
      const { data } = await api.get(`/bet-history`, {
      withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);








export const authReducer = createSlice({
    name: 'bet',
    initialState: {
      loader: false,
      errorMessage: '',
      successMessage: '',
      betInfo: null, // add userDetail to initialState
    },
    reducers: {
      messageClear: (state) => {
        state.errorMessage = '';
        state.successMessage = '';
      },
      user_reset: (state) => {
        state.betInfo = '';
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(userBet.pending, (state) => {
          state.loader = true;
        })
        .addCase(userBet.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(userBet.fulfilled, (state, { payload }) => {
          const betInfo = payload.newBet;
          state.successMessage = payload.message;
          state.loader = false;
          state.betInfo = betInfo;
        })

        .addCase(betList.pending, (state) => {
          state.loader = true;
        })
        .addCase(betList.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(betList.fulfilled, (state, { payload }) => {
          const betlists = payload.bets;
          
          state.successMessage = payload.message;
          state.loader = false;
          state.betlists = betlists;
        })

        .addCase(betAccept.pending, (state) => {
          state.loader = true;
        })
        .addCase(betAccept.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(betAccept.fulfilled, (state, { payload }) => {
          const betInfo = payload.bet;
          state.successMessage = payload.message;
          state.loader = false;
          state.betInfo = betInfo;
        })

        .addCase(setRoom.pending, (state) => {
          state.loader = true;
        })
        .addCase(setRoom.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(setRoom.fulfilled, (state, { payload }) => {
          const betInfo = payload.rooms;
          state.successMessage = payload.message;
          state.loader = false;
          state.betInfo = betInfo;
        })
        .addCase(betAcceptList.pending, (state) => {
          state.loader = true;
        })
        .addCase(betAcceptList.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(betAcceptList.fulfilled, (state, { payload }) => {
          const betInfoList = payload.bets;
          state.successMessage = payload.message;
          state.loader = false;
          state.betInfoList = betInfoList;
        })

        .addCase(betDelete.pending, (state) => {
          state.loader = true;
        })
        .addCase(betDelete.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(betDelete.fulfilled, (state, { payload }) => {
          const betInfoList = payload;
          state.successMessage = payload.message;
          state.loader = false;
          state.betInfoList = betInfoList;
        })
        .addCase(playBet.pending, (state) => {
          state.loader = true;
        })
        .addCase(playBet.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(playBet.fulfilled, (state, { payload }) => {
          const betplay = payload.bet;
          state.successMessage = payload.message;
          state.loader = false;
          state.betplay = betplay;
        })

        .addCase(updateStatus.pending, (state) => {
          state.loader = true;
        })
        .addCase(updateStatus.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(updateStatus.fulfilled, (state, { payload }) => {
          const betplay = payload.statuss;
          state.successMessage = payload.message;
          state.loader = false;
          state.betplay = betplay;
        })  

        .addCase(betHistory.pending, (state) => {
          state.loader = true;
        })
        .addCase(betHistory.rejected, (state, { payload }) => {
          // console.log('Login rejected payload:', payload); // Log payload
          state.errorMessage = payload?.error || 'An error occurred';
          state.loader = false;
        })
        .addCase(betHistory.fulfilled, (state, { payload }) => {
          const bethitorys = payload.historys          ;
         
          state.successMessage = payload.message;
          state.loader = false;
          state.bethitorys = bethitorys;
        })        
     
    }
  });
  
  export const { messageClear, user_reset } = authReducer.actions;
  export default authReducer.reducer;