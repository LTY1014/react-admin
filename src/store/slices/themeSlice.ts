import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  primaryColor: string;
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  primaryColor: '#1890ff',
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setPrimaryColor, toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer; 