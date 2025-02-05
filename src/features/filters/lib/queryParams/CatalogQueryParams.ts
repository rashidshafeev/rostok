import { OrderBy, SortOrder } from '@/entities/filter';

import type {
  BaseFilterParams,
  GetVariantsRequest,
  PaginationParams,
  SortingParams,
} from '@/entities/filter';

export interface CatalogQueryParams
  extends BaseFilterParams,
    SortingParams,
    PaginationParams {}

export class CatalogQueryParamsUtil {
  static parseQueryParams(queryString: string): CatalogQueryParams {
    const params = new URLSearchParams(queryString);

    const result: CatalogQueryParams = {
      // BaseFilterParams
      category_id: null,
      search: params.get('search') || null,
      min_price: null,
      max_price: null,
      brands: [],
      tags: [],
      filters: {},
      min_rating: null,
      max_rating: null,
      // SortingParams
      orderBy: (params.get('order_by') as OrderBy) || OrderBy.popularity,
      sortOrder: (params.get('sort_order') as SortOrder) || SortOrder.desc,
      // PaginationParams
      page: params.has('page') ? parseInt(params.get('page'), 10) : 1,
      limit: 20,
    };

    // Parse numeric values
    if (params.has('min_price')) {
      result.min_price =
        params.get('min_price') === 'null'
          ? null
          : parseInt(params.get('min_price'), 10);
    }
    if (params.has('max_price')) {
      result.max_price =
        params.get('max_price') === 'null'
          ? null
          : parseInt(params.get('max_price'), 10);
    }

    // Parse arrays
    if (params.has('brands')) {
      result.brands = params.get('brands').split(',').map(Number);
    }

    if (params.has('tags')) {
      result.tags = params.get('tags').split(',');
    }

    // Parse ratings
    if (params.has('min_rating')) {
      result.min_rating = parseFloat(params.get('min_rating'));
    }
    if (params.has('max_rating')) {
      result.max_rating = parseFloat(params.get('max_rating'));
    }

    // Parse dynamic filters
    params.forEach((value, key) => {
      if (key.startsWith('filter_')) {
        const filterId = parseInt(key.replace('filter_', ''), 10);
        result.filters[filterId] = value.split(',').map(Number);
      }
    });

    return result;
  }

  static buildQueryParams(params: Partial<CatalogQueryParams>): string {
    const urlParams = new URLSearchParams();

    // Helper to set non-null values
    const setIfPresent = <T>(key: string, value: T | null | undefined) => {
      if (value !== null && value !== undefined) {
        urlParams.set(key, value.toString());
      }
    };

    // Add BaseFilterParams
    setIfPresent('search', params.search);
    setIfPresent('min_price', params.min_price);
    setIfPresent('max_price', params.max_price);
    setIfPresent('min_rating', params.min_rating);
    setIfPresent('max_rating', params.max_rating);

    // Add arrays if not empty
    if (params.brands?.length) {
      urlParams.set('brands', params.brands.join(','));
    }

    if (params.tags?.length) {
      urlParams.set('tags', params.tags.join(','));
    }

    // Add dynamic filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value.length > 0) {
          urlParams.set(`filter_${key}`, value.join(','));
        }
      });
    }

    // Add SortingParams
    setIfPresent('order_by', params.orderBy);
    setIfPresent('sort_order', params.sortOrder);

    // Add PaginationParams
    setIfPresent('page', params.page);
    setIfPresent('limit', params.limit);

    return urlParams.toString();
  }

  static createRequestFromParams(
    params: CatalogQueryParams,
    overrides?: Partial<GetVariantsRequest>
  ): GetVariantsRequest {
    return {
      ...params,
      ...overrides,
    };
  }
}
