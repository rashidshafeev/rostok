// src/features/catalog/model/types.ts

import type { Product } from '@/entities/product';
import type { FiltersState } from '@/entities/filter';
import type { OrderBy, SortOrder } from '@/entities/filter/common/SortingParams';

export interface CatalogFiltersType extends FiltersState {
  category?: {
    id: number;
    name: string;
    product_count: number;
  };
}

export interface CatalogSortType {
  orderBy: OrderBy;
  sortOrder: SortOrder;
}

export interface CatalogViewType {
  type: 'tile' | 'line' | 'lineNarrow';
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
  filters: CatalogFiltersType;
  sort: CatalogSortType;
  view: CatalogViewType;
  pagination: CatalogPagination;
  isFiltersLoading: boolean;
  isProductsLoading: boolean;
  filtersModalOpen: boolean;
}

export type FilterType = keyof CatalogFiltersType;

export interface FilterUpdatePayload {
  filter: FilterType;
  value: any;
  id?: number | string;
  filterId?: number;
}

export interface PriceFilterValue {
  min: number;
  max: number;
}

export type FilterValue = 
  | PriceFilterValue 
  | number[]  // For brands, tags
  | boolean   // For toggles
  | { id: number; value: boolean }[]; // For dynamic filters