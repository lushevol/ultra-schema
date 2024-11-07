import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RatanDashboardSchema } from 'src/dashboard/types/my-dashboard-types';

type DashboardRootType = {
  schema: RatanDashboardSchema;
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    schema: {},
  } as DashboardRootType,
  reducers: {
    setDashboardSchema: (
      state,
      action: PayloadAction<RatanDashboardSchema>,
    ) => {
      state.schema = action.payload;
    },
  },
});

export const { setDashboardSchema } = dashboardSlice.actions;
export default dashboardSlice.reducer;
