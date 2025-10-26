import { configureStrore } from "@reduxjs/toolkit";
import athleteReducer from "./slices/athleteSlice.js";
import teamsReducer from "./slices/teamSlice.js";
import staffReducer from "./slices/staffSlice.js";
import uiReducer from "./slices/uiSlice.js";

export const store = configureStrore({
  reducer: {
    athletes: athleteReducer,
    teams: teamsReducer,
    statff: staffReducer,
    ui: uiReducer,
  },
});
