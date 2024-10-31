import type { AgGridEvent } from '@ag-grid-community/core';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type AggridRootType = {
  aggrid: AgGridEvent | null;
};

export const aggridSlice = createSlice({
  name: 'aggrid',
  initialState: {
    aggrid: null,
  } as AggridRootType,
  reducers: {
    setAggridEvent: (state, action: PayloadAction<AgGridEvent>) => {
      state.aggrid = action.payload;
    },
  },
});

export const { setAggridEvent } = aggridSlice.actions;
export default aggridSlice.reducer;
