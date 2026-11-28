import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  ExplorerCriteria,
  RecentExplorerSearch,
} from '../types/explorer.types';

interface ExplorerState {
  criteria: ExplorerCriteria;
  recentSearches: RecentExplorerSearch[];
}

const initialState: ExplorerState = {
  criteria: {
    voltage: null,
    upstreamBreakerId: '',
    downstreamBreakerId: '',
  },
  recentSearches: [],
};

const MAX_RECENT_SEARCHES = 5;

const explorerSlice = createSlice({
  name: 'explorer',

  initialState,

  reducers: {
    setExplorerCriteria: (
      state,
      action: PayloadAction<ExplorerCriteria>,
    ) => {
      state.criteria = action.payload;
    },

    clearExplorerCriteria: (state) => {
      state.criteria = initialState.criteria;
    },

    addRecentSearch: (
      state,
      action: PayloadAction<RecentExplorerSearch>,
    ) => {
      const newSearch = action.payload;

      state.recentSearches = [
        newSearch,
        ...state.recentSearches.filter(
          (search) =>
            !(
              search.voltage === newSearch.voltage &&
              search.upstreamBreakerId ===
                newSearch.upstreamBreakerId &&
              search.downstreamBreakerId ===
                newSearch.downstreamBreakerId
            ),
        ),
      ].slice(0, MAX_RECENT_SEARCHES);
    },

    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  setExplorerCriteria,
  clearExplorerCriteria,
  addRecentSearch,
  clearRecentSearches,
} = explorerSlice.actions;

export const explorerReducer = explorerSlice.reducer;