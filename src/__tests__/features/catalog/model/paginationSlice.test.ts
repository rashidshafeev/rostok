import { paginationSlice, setPage, setTotal, resetPagination } from '@/features/catalog/model';
import type { CatalogPagination } from '@/shared/types';

describe('paginationSlice', () => {
	const initialState: CatalogPagination = {
		page: 1,
		limit: 20,
		total: 0,
	};

	it('should handle initial state', () => {
		expect(paginationSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle setPage', () => {
		const newPage = 2;
		const actual = paginationSlice.reducer(initialState, setPage(newPage));
		expect(actual.page).toBe(newPage);
	});

	it('should handle setTotal', () => {
		const newTotal = 100;
		const actual = paginationSlice.reducer(initialState, setTotal(newTotal));
		expect(actual.total).toBe(newTotal);
	});

	it('should handle resetPagination', () => {
		const modifiedState = {
			...initialState,
			page: 3,
			total: 100,
		};
		const actual = paginationSlice.reducer(modifiedState, resetPagination());
		expect(actual.page).toBe(initialState.page);
		expect(actual.limit).toBe(initialState.limit);
	});

	it('should maintain limit value after actions', () => {
		const state = paginationSlice.reducer(initialState, setPage(2));
		expect(state.limit).toBe(initialState.limit);
		
		const stateAfterTotal = paginationSlice.reducer(state, setTotal(100));
		expect(stateAfterTotal.limit).toBe(initialState.limit);
	});
});