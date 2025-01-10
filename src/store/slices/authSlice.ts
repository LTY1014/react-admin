import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserResponse } from '../../api/user';

interface AuthState {
  isAuthenticated: boolean;
  user: UserResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserResponse }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 