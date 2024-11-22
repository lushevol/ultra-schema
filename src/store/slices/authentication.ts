import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthenticationRootType = {
  userId: string;
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    userId: '',
  } as AuthenticationRootType,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = authenticationSlice.actions;

export default authenticationSlice.reducer;
