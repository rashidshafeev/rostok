import type { FiltersState } from '@/entities/filter/Filters/FiltersState';
import type {
  SortingParams,
  PaginationParams,
  GetVariantsResponse,
  GetFiltersResponse,
} from '@/types/ServerData/Catalog';

export interface CatalogState {
  filters: FiltersState;
  sorting: SortingParams;
  pagination: PaginationParams;
  categoryId: string | null;
  isFiltersLoading: boolean;
  isProductsLoading: boolean;
  products: GetVariantsResponse | null;
  availableFilters: GetFiltersResponse | null;
}

export interface CatalogViewProps {
  filters: FiltersState;
  sorting: SortingParams;
  pagination: PaginationParams;
  isFiltersLoading: boolean;
  isProductsLoading: boolean;
  products: GetVariantsResponse | null;
  onSortingChange: (sorting: SortingParams) => void;
  onFiltersChange: (filters: FiltersState) => void;
  onPageChange: (page: number) => void;
  onCategoryChange: (categoryId: string | null) => void;
}
