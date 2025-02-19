import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CatalogFiltersType, FilterUpdatePayload } from './types';

interface FiltersState {
	data: CatalogFiltersType;
	isLoading: boolean;
	modalOpen: boolean;
}

const initialState: FiltersState = {
	data: {
		basics: {
			price: {
				min: 0,
				max: 0,
			},
			tags: [],
			brands: [],
			rating: [],
		},
		dynamics: [],
		more: [],
	},
	isLoading: false,
	modalOpen: false,
};

export const filtersSlice = createSlice({
	name: 'catalogFilters',
	initialState,
	reducers: {
		updateFilter: (state, action: PayloadAction<FilterUpdatePayload>) => {
			const { filter, value } = action.payload;
			state.data[filter] = value;
		},
		setFiltersLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setFiltersModalOpen: (state, action: PayloadAction<boolean>) => {
			state.modalOpen = action.payload;
		},
		resetFilters: (state) => {
			state.data = initialState.data;
		},
	},
});

export const {
	updateFilter,
	setFiltersLoading,
	setFiltersModalOpen,
	resetFilters,
} = filtersSlice.actions;

// Selectors
export const selectFilters = (state: { catalogFilters: FiltersState }) => state.catalogFilters.data;
export const selectIsFiltersLoading = (state: { catalogFilters: FiltersState }) => state.catalogFilters.isLoading;
export const selectFiltersModalOpen = (state: { catalogFilters: FiltersState }) => state.catalogFilters.modalOpen;

export default filtersSlice.reducer;