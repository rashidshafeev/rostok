import { filtersSlice, updateFilter, setFiltersLoading, setFiltersModalOpen, resetFilters } from '@/features/catalog/model';
import type { FiltersState } from '@/shared/types';

describe('filtersSlice', () => {
	const initialState = {
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

	it('should handle initial state', () => {
		expect(filtersSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle updateFilter', () => {
		const newPrice = { min: 100, max: 1000 };
		const actual = filtersSlice.reducer(
			initialState,
			updateFilter({ filter: 'basics', value: { price: newPrice } })
		);
		expect(actual.data.basics.price).toEqual(newPrice);
	});

	it('should handle setFiltersLoading', () => {
		const actual = filtersSlice.reducer(initialState, setFiltersLoading(true));
		expect(actual.isLoading).toBe(true);
	});

	it('should handle setFiltersModalOpen', () => {
		const actual = filtersSlice.reducer(initialState, setFiltersModalOpen(true));
		expect(actual.modalOpen).toBe(true);
	});

	it('should handle resetFilters', () => {
		const modifiedState = {
			...initialState,
			data: {
				...initialState.data,
				basics: {
					...initialState.data.basics,
					price: { min: 100, max: 1000 },
				},
			},
		};
		const actual = filtersSlice.reducer(modifiedState, resetFilters());
		expect(actual).toEqual(initialState);
	});
});