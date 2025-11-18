import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await api.get("/users");
  return res.data.data;
});

export const createUser = createAsyncThunk("users/create", async (data: any) => {
  const res = await api.post("/users", data);
  return res.data.data;
});

export const updateUser = createAsyncThunk("users/update", async (data: any) => {
  const res = await api.post("/users", data);
  return res.data.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id: number) => {
  await api.delete(`/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => { state.loading = true })
      
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.list = state.list.map(u =>
          u.id === action.payload.id ? action.payload : u
        );
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
