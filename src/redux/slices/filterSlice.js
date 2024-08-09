// src/features/favorite/favoriteSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
  sort: {},
  lastChanged: {},
  isLoading: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      if (JSON.stringify(state.filters) !== JSON.stringify(action.payload)) {
      state.filters = action.payload;
      }
    },
    // setDisplayFilters: (state, action) => {
    //   if (JSON.stringify(state.filters.display) !== JSON.stringify(action.payload)) {
    //     state.filters.display = action.payload;
      
    //   }
    // },
    // setSendFilters: (state, action) => {
    //   state.filters.send = action.payload;
    // },
    setPriceFilter: (state, action) => {
      state.filters.basics.price = {
        min: action.payload.min,
        max: action.payload.max,
      };

      state.filters.lastChanged = {
        type: "basics",
        filter: "price",
      };
    },
    toggleBrandsFilterValue: (state, action) => {
      const brand = state.filters.basics.brands.find((brand) => brand.id === action.payload)
      brand.is_selected = !brand.is_selected;

      state.filters.lastChanged = {
        type: "basics",
        filter: "brands",
      }
    },
    toggleTagsFilterValue: (state, action) => {
      const tag = state.filters.basics.tags.find((tag) => tag.tag === action.payload)
      tag.is_selected = !tag.is_selected;

      state.filters.lastChanged = {
        type: "basics",
        filter: "tags",
      }
    },
    toggleDynamicFilterCheckbox: (state, action) => {
      const filterId = action.payload.filterId;
      const valueId = action.payload.valueId;

      const filter = state.filters.dynamics.find(
        (filter) => filter.id === filterId
      );
      const value = filter.values.find((value) => value.id === valueId);
      value.is_selected = !value.is_selected;

      state.filters.lastChanged = {
        type: "dynamics",
        filter: filterId
      };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export const {
  setFilters,
  setPriceFilter,
  toggleBrandsFilterValue,
  toggleTagsFilterValue,
  toggleDynamicFilterCheckbox,
  setSort,

  setDisplayFilters,
  setSendFilters,

  setIsLoading
} =
  filterSlice.actions;
export default filterSlice.reducer;
