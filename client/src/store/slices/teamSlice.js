import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { teamService } from "../../services/team.service.js";

export const fetchTeams = createAsyncThunk(
  "teams/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teamService.getAll();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createTeam = createAsyncThunk(
  "teams/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await teamService.create(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "teams/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await teamService.update(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/delete",
  async (id, { rejectWithValue }) => {
    try {
      await teamService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearError: clearTeamError } = teamSlice.actions;
export default teamSlice.reducer;
