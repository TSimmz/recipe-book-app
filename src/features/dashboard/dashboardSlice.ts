import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/features/store';

type DashboardSliceState = {
  navbarOpened: boolean;
  navbarWidth: number;
  activeBook: string;
  activeRecipe: string;
  selectedBook: string;
  selectedRecipe: string;
};

const initialState: DashboardSliceState = {
  navbarOpened: false,
  navbarWidth: 220,
  activeBook: '',
  activeRecipe: '',
  selectedBook: '',
  selectedRecipe: '',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setNavbarOpened: (
      state: DashboardSliceState,
      action: PayloadAction<boolean>,
    ) => {
      state.navbarOpened = action.payload;
    },
    toggleNavbar: (state: DashboardSliceState) => {
      state.navbarOpened = !state.navbarOpened;
    },
    setNavbarWidth: (
      state: DashboardSliceState,
      action: PayloadAction<number>,
    ) => {
      state.navbarWidth = action.payload;
    },
    setActiveBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.activeBook = action.payload;
    },
    clearActiveBook: (state) => {
      state.activeBook = '';
    },
    setActiveRecipe: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.activeRecipe = action.payload;
    },
    clearActiveRecipe: (state: DashboardSliceState) => {
      state.activeRecipe = '';
    },
    setSelectedBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      if (state.selectedBook === action.payload) state.selectedBook = '';
      else state.selectedBook = action.payload;
    },
    clearSelectedBook: (state: DashboardSliceState) => {
      state.selectedBook = '';
    },
    setSelectedRecipe: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      if (state.selectedRecipe === action.payload) state.selectedRecipe = '';
      else state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state: DashboardSliceState) => {
      state.selectedRecipe = '';
    },
    setSelectAndActiveBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.selectedBook = action.payload;
      state.activeBook = action.payload;
    },
    setSelectAndActiveRecipe: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.selectedRecipe = action.payload;
      state.activeRecipe = action.payload;
    },
  },
});

export const {
  setNavbarOpened,
  toggleNavbar,
  setActiveBook: setActiveBook,
  setActiveRecipe,
  clearActiveBook: clearActiveBook,
  clearActiveRecipe,
  setSelectedBook: setSelectedBook,
  setSelectedRecipe,
  clearSelectedBook: clearSelectedBook,
  clearSelectedRecipe,
  setSelectAndActiveBook: setSelectAndActiveBook,
  setSelectAndActiveRecipe,
  setNavbarWidth,
} = dashboardSlice.actions;

export const selectNavbarOpened = (state: RootState) =>
  state.dashboard.navbarOpened;
export const selectActiveBook = (state: RootState) =>
  state.dashboard.activeBook;
export const selectActiveRecipe = (state: RootState) =>
  state.dashboard.activeRecipe;
export const selectSelectedBook = (state: RootState) =>
  state.dashboard.selectedBook;
export const selectSelectedRecipe = (state: RootState) =>
  state.dashboard.selectedRecipe;
export const selectNavbarWidth = (state: RootState) =>
  state.dashboard.navbarWidth;

export default dashboardSlice.reducer;
