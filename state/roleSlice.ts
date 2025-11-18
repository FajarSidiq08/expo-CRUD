import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '@/api/api';

export const fetchRole = createAsyncThunk('roles/fetch', async () => {
    const res = await api.get("/roles");
    return res.data.data;
});

export const createRole = createAsyncThunk('roles/create', async (data: any) => {
    const res = await api.post("/roles", data);
    return res.data.data;
});

export const updateRole = createAsyncThunk('roles/update', async (data: any) => {
    const res = await api.post("/roles", data);
    return res.data.data;
});

export const deleteRole = createAsyncThunk('roles/delete', async (id: any) => {
    await api.delete(`/roles/${id}`);
    return id;
});

const roleSlice = createSlice({
    name: "role",
    initialState:{
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

      .addCase(fetchRole.pending, (state) => { state.loading = true })
      
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })

      .addCase(createRole.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        state.list = state.list.map(u =>
          u.id === action.payload.id ? action.payload : u
        );
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      });    }

});

export default roleSlice.reducer;