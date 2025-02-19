// Slices
export { default as catalogReducer } from './catalogSlice';
export { default as filtersReducer } from './filtersSlice';
export { default as sortingReducer } from './sortingSlice';
export { default as paginationReducer } from './paginationSlice';
export { default as viewReducer } from './viewSlice';

// Actions
export {
	setProducts,
	setProductsLoading,
} from './catalogSlice';

export {
	updateFilter,
	setFiltersLoading,
	setFiltersModalOpen,
	resetFilters,
} from './filtersSlice';

export {
	setSort,
} from './sortingSlice';

export {
	setPage,
	setTotal,
	resetPagination,
} from './paginationSlice';

export {
	setView,
} from './viewSlice';

// Selectors
export {
	selectProducts,
	selectIsProductsLoading,
} from './catalogSlice';

export {
	selectFilters,
	selectIsFiltersLoading,
	selectFiltersModalOpen,
} from './filtersSlice';

export {
	selectSort,
} from './sortingSlice';

export {
	selectPagination,
	selectCurrentPage,
	selectTotalItems,
} from './paginationSlice';

export {
	selectView,
} from './viewSlice';

export type * from './types';
