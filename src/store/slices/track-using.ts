import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

type TrackUsingRootType = {
  keys: Set<string>;
  usersAreUsing: {
    [key: string]: {
      userId: string;
      timestamp: number;
    }[];
  };
};

export const trackUsingSlice = createSlice({
  name: 'trackUsing',
  initialState: {
    // keys I'm using
    keys: new Set(),
    // query result of who is using
    usersAreUsing: {},
  } as TrackUsingRootType,
  reducers: {
    addTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.add(action.payload);
    },
    removeTrackUsingKey: (state, action: PayloadAction<string>) => {
      state.keys.delete(action.payload);
    },
    setUsersAreUsing: (
      state,
      action: PayloadAction<TrackUsingRootType['usersAreUsing']>,
    ) => {
      state.usersAreUsing = action.payload;
    },
  },
});

export const { addTrackUsingKey, removeTrackUsingKey, setUsersAreUsing } =
  trackUsingSlice.actions;
export default trackUsingSlice.reducer;
