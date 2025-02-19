import type { FiltersState } from './filters';
import type { Product } from '@/entities/product';

export type CatalogViewType = {
	type: 'tile' | 'line' | 'lineNarrow';
};

export type OrderBy = 'popularity' | 'price' | 'rating' | 'discount';
export type SortOrder = 'asc' | 'desc';

export interface CatalogSortType {
	orderBy: OrderBy;
	sortOrder: SortOrder;
}

export interface CatalogPagination {
	page: number;
	limit: number;
	total: number;
}

export interface ProductsState {
	ids: number[];
	entities: Record<number, Product>;
}

export interface CatalogState {
	products: ProductsState;
	filters: FiltersState;
	sort: CatalogSortType;
	view: CatalogViewType;
	pagination: CatalogPagination;
	isLoading: boolean;
}