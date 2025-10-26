import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { athleteService } from "../../services/athlete.service.js";

export const fetchAthletes = createAsyncThunk(
  "athletes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await athleteService.getAll();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAthleteById = createAsyncThunk(
  "athlete/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await athleteService.getById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createAthlete = createAsyncThunk(
  "athlete/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await athleteService.create(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateAthlete = createAsyncThunk(
  "athlete/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await athleteService.update(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteAthlete = createAsyncThunk(
  "athlete/delete",
  async (id, { rejectWithValue }) => {
    try {
      await athleteService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const athleteSlice = createSlice({
  name: "athletes",
  initialState: {
    items: [],
    currentAthlete: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAthlete: (state) => {
      state.currentAthlete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthletes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAthleteById.fulfilled, (state, action) => {
        state.currentAthlete = action.payload;
      })
      .addCase(createAthlete.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateAthlete.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAthlete.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a._id !== action.payload);
      });
  },
});

export const { clearError, clearCurrentAthlete } = athleteSlice.actions;
export default athleteSlice.reducer;
