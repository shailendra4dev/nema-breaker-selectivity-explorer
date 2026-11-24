import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type DisplayDensity = 'comfortable' | 'compact';

type PreferencesState = {
  displayDensity: DisplayDensity;
};

const initialState: PreferencesState = {
  displayDensity: 'comfortable',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setDisplayDensity: (
      state,
      action: PayloadAction<DisplayDensity>,
    ) => {
      state.displayDensity = action.payload;
    },
    toggleDisplayDensity: (state) => {
      state.displayDensity =
        state.displayDensity === 'comfortable'
          ? 'compact'
          : 'comfortable';
    },
  },
});

export const {
  setDisplayDensity,
  toggleDisplayDensity,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;