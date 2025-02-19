import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CatalogPagination } from './types';

const initialState: CatalogPagination = {
	page: 1,
	limit: 20,
	total: 0,
};

export const paginationSlice = createSlice({
	name: 'catalogPagination',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		},
		resetPagination: (state) => {
			state.page = initialState.page;
		},
	},
});

export const { setPage, setTotal, resetPagination } = paginationSlice.actions;

// Selectors
export const selectPagination = (state: { catalogPagination: CatalogPagination }) => state.catalogPagination;
export const selectCurrentPage = (state: { catalogPagination: CatalogPagination }) => state.catalogPagination.page;
export const selectTotalItems = (state: { catalogPagination: CatalogPagination }) => state.catalogPagination.total;

export default paginationSlice.reducer;