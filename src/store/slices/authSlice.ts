import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserResponse } from '../../api/user';

interface AuthState {
  user: UserResponse | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<{ user: UserResponse }>) => {
      state.user = action.payload.user;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer; 