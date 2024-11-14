import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { trackUsingApi } from '../../rtk-query/track-using-api'; // Assuming this is your API endpoint

const postImUsing = trackUsingApi.endpoints.postImUsing.initiate;

let trackingInterval: NodeJS.Timeout | null = null;

type TrackUsingRootType = {
  keys: Set<string>;
};

// Helper function to manage interval
const startTrackingInterval = (state: TrackUsingRootType) => {
  if (trackingInterval) {
    clearInterval(trackingInterval);
  }

  trackingInterval = setInterval(
    () => {
      const keys = Array.from(state.keys);
      if (keys.length > 0) {
        postImUsing({ keys });
      }
    },
    2 * 60 * 1000,
  ); // 2 minutes
};

export const trackUsingSlice = createSlice({
  name: 'trackUsing',
  initialState: {
    keys: new Set(),
  } as TrackUsingRootType,
  reducers: {
    addTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.add(action.payload);
      startTrackingInterval(state);
    },
    removeTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.delete(action.payload);
      startTrackingInterval(state);
    },
  },
});

export const { addTrackUsingKey, removeTrackUsingKey } =
  trackUsingSlice.actions;
export default trackUsingSlice.reducer;

// Cleanup function
export const cleanupTracking = () => {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }
};
