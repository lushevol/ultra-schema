import type { AgGridEvent } from '@ag-grid-community/core';
import { createSlice } from '@reduxjs/toolkit';

type AggridRootType = {
  aggrid: AgGridEvent | null;
};

export const aggridSlice = createSlice({
  name: 'aggrid',
  initialState: {
    aggrid: null,
  } as AggridRootType,
  reducers: {
    setAggridEvent: (state, action) => {
      state.aggrid = action.payload;
    },
  },
});
