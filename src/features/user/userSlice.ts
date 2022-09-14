import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/pages/store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    }, 
    clearUser: (state) => { state = {}},
  }
});

export const {
  setUser,
  clearUser,
} = userSlice.actions;


export const selectUser = (state : RootState) => state.user;

export default userSlice.reducer;