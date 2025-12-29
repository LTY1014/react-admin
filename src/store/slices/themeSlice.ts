import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  primaryColor: string;
  isDarkMode: boolean;
  menuMode: string
}

const initialState: ThemeState = {
  primaryColor: '#1890ff',
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  menuMode: localStorage.getItem('menuMode') as 'sider' || 'sider'
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
      localStorage.setItem('isDarkMode', String(state.isDarkMode));
    },
    setMenuMode: (state, action: PayloadAction<'sider' | 'top'>) => {
      state.menuMode = action.payload;
      localStorage.setItem('menuMode', action.payload); // 保存到 localStorage
    },
  }
});

export const { setPrimaryColor, toggleDarkMode,setMenuMode } = themeSlice.actions;
export default themeSlice.reducer; 