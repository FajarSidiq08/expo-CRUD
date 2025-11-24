import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const login = createAsyncThunk("auth/login", async (data: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await api.post("/login", data);
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const register = createAsyncThunk("auth/register", async (data: any, thunkAPI) => {
  try {
    const res = await api.post("/register", data);
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("LOGIN PAYLOAD:", action.payload);

        state.loading = false;
        state.user = { email: action.payload.email };
        state.token = action.payload.key;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.fulfilled, (state, action) => {
        console.log("Register success:", action.payload);
      });
  },
});

export default authSlice.reducer;
