import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/features/store';

type DashboardSliceState = {
  navbarOpened: boolean;
  activeRecipeBook: string;
  activeRecipe: string;
};

const initialState: DashboardSliceState = {
  navbarOpened: false,
  activeRecipeBook: '',
  activeRecipe: '',
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
    setActiveRecipeBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.activeRecipeBook = action.payload;
    },
    clearActiveRecipeBook: (state) => {
      state.activeRecipeBook = '';
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
  },
});

export const {
  setNavbarOpened,
  toggleNavbar,
  setActiveRecipeBook,
  setActiveRecipe,
  clearActiveRecipeBook,
  clearActiveRecipe,
} = dashboardSlice.actions;

export const selectNavbarOpened = (state: RootState) =>
  state.dashboard.navbarOpened;
export const selectActiveRecipeBook = (state: RootState) =>
  state.dashboard.activeRecipeBook;
export const selectActiveRecipe = (state: RootState) =>
  state.dashboard.activeRecipe;

export default dashboardSlice.reducer;
