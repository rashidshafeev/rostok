import { QueryParamsUtil } from '@/shared/lib/url';
import type { OrderBy, SortOrder } from '@/entities/filter';

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

const defaultValues: CatalogQueryParams = {
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

const numberParams = ['min_price', 'max_price', 'min_rating', 'max_rating', 'page', 'limit'];
const arrayParams = ['brands', 'tags'];

export class CatalogQueryParamsUtil {
  static parseQueryParams(queryString: string): CatalogQueryParams {
    return QueryParamsUtil.parse<CatalogQueryParams>(queryString, {
      numberParams,
      arrayParams,
      defaultValues,
    });
  }

  static buildQueryParams(params: CatalogQueryParams): string {
    return QueryParamsUtil.build(params);
  }
}

