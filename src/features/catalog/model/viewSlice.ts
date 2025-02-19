import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CatalogViewType } from './types';

const loadSavedView = (): CatalogViewType['type'] => {
	const saved = localStorage.getItem('cardView');
	return (saved as CatalogViewType['type']) || 'tile';
};

const initialState: CatalogViewType = {
	type: loadSavedView(),
};

export const viewSlice = createSlice({
	name: 'catalogView',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<CatalogViewType['type']>) => {
			state.type = action.payload;
			localStorage.setItem('cardView', action.payload);
		},
	},
});

export const { setView } = viewSlice.actions;

// Selectors
export const selectView = (state: { catalogView: CatalogViewType }) => state.catalogView.type;

export default viewSlice.reducer;