import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/features/store';

type DashboardSliceState = {
  navbarOpened: boolean;
  navbarWidth: number;
  activeRecipeBook: string;
  activeRecipe: string;
  selectedRecipeBook: string;
  selectedRecipe: string;
};

const initialState: DashboardSliceState = {
  navbarOpened: false,
  navbarWidth: 220,
  activeRecipeBook: '',
  activeRecipe: '',
  selectedRecipeBook: '',
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
    setSelectedRecipeBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      if (state.selectedRecipeBook === action.payload)
        state.selectedRecipeBook = '';
      else state.selectedRecipeBook = action.payload;
    },
    clearSelectedRecipeBook: (state: DashboardSliceState) => {
      state.selectedRecipeBook = '';
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
    setSelectAndActiveRecipeBook: (
      state: DashboardSliceState,
      action: PayloadAction<string>,
    ) => {
      state.selectedRecipeBook = action.payload;
      state.activeRecipeBook = action.payload;
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
  setActiveRecipeBook,
  setActiveRecipe,
  clearActiveRecipeBook,
  clearActiveRecipe,
  setSelectedRecipeBook,
  setSelectedRecipe,
  clearSelectedRecipeBook,
  clearSelectedRecipe,
  setSelectAndActiveRecipeBook,
  setSelectAndActiveRecipe,
  setNavbarWidth,
} = dashboardSlice.actions;

export const selectNavbarOpened = (state: RootState) =>
  state.dashboard.navbarOpened;
export const selectActiveRecipeBook = (state: RootState) =>
  state.dashboard.activeRecipeBook;
export const selectActiveRecipe = (state: RootState) =>
  state.dashboard.activeRecipe;
export const selectSelectedRecipeBook = (state: RootState) =>
  state.dashboard.selectedRecipeBook;
export const selectSelectedRecipe = (state: RootState) =>
  state.dashboard.selectedRecipe;
export const selectNavbarWidth = (state: RootState) =>
  state.dashboard.navbarWidth;

export default dashboardSlice.reducer;
