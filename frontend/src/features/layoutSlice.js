import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isSideMenuOpen: false,
  },
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
});

export const { toggleSideMenu } = layoutSlice.actions;
export default layoutSlice.reducer;
