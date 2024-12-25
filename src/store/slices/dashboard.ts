import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import dashboardSchema from '../../dashboard/schema/ratan-dashboard.json';

type DashboardRootType = {
  schema: RatanDashboardSchema;
  refreshInterval: number;
};

const DEFAULT_REFRESH_INTERVAL = 60;

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    schema: dashboardSchema,
    refreshInterval:
      dashboardSchema.refreshInterval ?? DEFAULT_REFRESH_INTERVAL,
  } as DashboardRootType,
  reducers: {
    setDashboardSchema: (
      state,
      action: PayloadAction<RatanDashboardSchema>,
    ) => {
      state.schema = action.payload;
    },
    refreshDashboard: (state) => {
      state.schema = JSON.parse(JSON.stringify(state.schema));
    },
    setDashboardRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const {
  setDashboardSchema,
  setDashboardRefreshInterval,
  refreshDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
