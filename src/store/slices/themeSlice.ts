import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  primaryColor: string;
  isDarkMode: boolean;
  menuMode: string
}

const keyPrimaryColor = 'react:primaryColor';
const keyIsDarkMode = 'react:isDarkMode';
const keyMenuMode = 'react:menuMode';

const initialState: ThemeState = {
  primaryColor: localStorage.getItem(keyPrimaryColor) || '#1890ff',
  isDarkMode: localStorage.getItem(keyIsDarkMode) === 'true',
  menuMode: localStorage.getItem(keyMenuMode) as 'sider' || 'sider' // 可以改成 'top'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string | null>) => {
      state.primaryColor = action.payload || '#1890ff';
      localStorage.setItem(keyPrimaryColor, state.primaryColor);
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem(keyIsDarkMode, String(state.isDarkMode));
    },
    setMenuMode: (state, action: PayloadAction<'sider' | 'top'>) => {
      state.menuMode = action.payload;
      localStorage.setItem(keyMenuMode, action.payload); // 保存到 localStorage
    },
  }
});

export const { setPrimaryColor, toggleDarkMode,setMenuMode } = themeSlice.actions;
export default themeSlice.reducer; 