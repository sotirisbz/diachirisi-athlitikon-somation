import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { staffService } from "../../services/staff.service.js";

export const fetchStaff = createAsyncThunk(
  "staff/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await staffService.getAll();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchStaffById = createAsyncThunk(
  "staff/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await staffService.getById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createStaff = createAsyncThunk(
  "staff/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await staffService.create(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateStaff = createAsyncThunk(
  "staff/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await staffService.update(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/delete",
  async (id, { rejectWithValue }) => {
    try {
      await staffService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const stafSlice = createSlice({
  name: "staff",
  initialState: {
    items: [],
    currentStaff: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentStaff: (state) => {
      state.currentStaff = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchStaffById.fulfilled, (state, action) => {
        state.currentStaff = action.payload;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index === -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export const { clearError: clearStaffError } = stafSlice.actions;
export default stafSlice.reducer;
