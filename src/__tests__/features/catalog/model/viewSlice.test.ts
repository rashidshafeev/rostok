import { viewSlice, setView } from '@/features/catalog/model';
import type { CatalogViewType } from '@/shared/types';

describe('viewSlice', () => {
	const initialState: CatalogViewType = {
		type: 'tile',
	};

	beforeEach(() => {
		localStorage.clear();
	});

	it('should handle initial state', () => {
		expect(viewSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle setView', () => {
		const newView: CatalogViewType['type'] = 'line';
		const actual = viewSlice.reducer(initialState, setView(newView));
		expect(actual.type).toBe(newView);
	});

	it('should save view type to localStorage', () => {
		const newView: CatalogViewType['type'] = 'lineNarrow';
		viewSlice.reducer(initialState, setView(newView));
		expect(localStorage.getItem('cardView')).toBe(newView);
	});

	it('should load view type from localStorage', () => {
		localStorage.setItem('cardView', 'line');
		const loadedState = viewSlice.reducer(undefined, { type: 'unknown' });
		expect(loadedState.type).toBe('line');
	});

	it('should default to tile view if localStorage is empty', () => {
		const loadedState = viewSlice.reducer(undefined, { type: 'unknown' });
		expect(loadedState.type).toBe('tile');
	});
});