// src/features/catalog/lib/utils/queryParams.ts

import type {
  OrderBy,
  SortOrder,
} from '@/entities/filter';

export interface CatalogQueryParams {
  category_id?: string | null;
  search?: string | null;
  min_price?: number | null;
  max_price?: number | null;
  brands?: number[];
  tags?: string[];
  filters?: Record<string, number[]>;
  min_rating?: number | null;
  max_rating?: number | null;
  orderBy?: OrderBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export class CatalogQueryParamsUtil {
  static parseQueryParams(queryString: string): CatalogQueryParams {
    const params = new URLSearchParams(queryString);
    const result: CatalogQueryParams = {
      category_id: null,
      search: null,
      min_price: null,
      max_price: null,
      brands: [],
      tags: [],
      filters: {},
      min_rating: null,
      max_rating: null,
      page: 1,
      limit: 20,
    };

    // Parse category_id
    if (params.has('category_id')) {
      result.category_id = params.get('category_id');
    }

    // Parse search
    if (params.has('search')) {
      result.search = params.get('search');
    }

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

    // Parse dynamic filters
    params.forEach((value, key) => {
      if (key.startsWith('filter_')) {
        const filterId = key.replace('filter_', '');
        result.filters[filterId] = value.split(',').map(Number);
      }
    });

    // Parse ratings
    if (params.has('min_rating')) {
      result.min_rating = parseFloat(params.get('min_rating'));
    }
    if (params.has('max_rating')) {
      result.max_rating = parseFloat(params.get('max_rating'));
    }

    // Parse sort params
    if (params.has('orderBy')) {
      result.orderBy = params.get('orderBy') as OrderBy;
    }
    if (params.has('sortOrder')) {
      result.sortOrder = params.get('sortOrder') as SortOrder;
    }

    // Parse pagination
    if (params.has('page')) {
      result.page = parseInt(params.get('page'), 10);
    }
    if (params.has('limit')) {
      result.limit = parseInt(params.get('limit'), 10);
    }

    return result;
  }

  static buildQueryParams(params: CatalogQueryParams): string {
    const urlParams = new URLSearchParams();

    // Helper to set non-null values
    const setIfPresent = (key: string, value: any) => {
      if (value !== null && value !== undefined) {
        urlParams.set(key, value.toString());
      }
    };

    // Add basic params
    setIfPresent('category_id', params.category_id);
    setIfPresent('search', params.search);
    setIfPresent('min_price', params.min_price);
    setIfPresent('max_price', params.max_price);
    setIfPresent('min_rating', params.min_rating);
    setIfPresent('max_rating', params.max_rating);

    // Add arrays
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

    // Add sort params
    setIfPresent('orderBy', params.orderBy);
    setIfPresent('sortOrder', params.sortOrder);

    // Add pagination
    setIfPresent('page', params.page);
    setIfPresent('limit', params.limit);

    return urlParams.toString();
  }
}
