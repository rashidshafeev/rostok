import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CatalogSortType } from './types';

const initialState: CatalogSortType = {
	orderBy: 'popularity',
	sortOrder: 'desc',
};

export const sortingSlice = createSlice({
	name: 'catalogSorting',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<CatalogSortType>) => {
			state.orderBy = action.payload.orderBy;
			state.sortOrder = action.payload.sortOrder;
		},
	},
});

export const { setSort } = sortingSlice.actions;

// Selectors
export const selectSort = (state: { catalogSorting: CatalogSortType }) => state.catalogSorting;

export default sortingSlice.reducer;