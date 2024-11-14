import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

type TrackUsingRootType = {
  keys: Set<string>;
};

export const trackUsingSlice = createSlice({
  name: 'trackUsing',
  initialState: {
    keys: new Set(),
  } as TrackUsingRootType,
  reducers: {
    addTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.add(action.payload);
    },
    removeTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.delete(action.payload);
    },
  },
});

export const { addTrackUsingKey, removeTrackUsingKey } =
  trackUsingSlice.actions;
export default trackUsingSlice.reducer;
