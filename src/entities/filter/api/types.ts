import type { ProductListCategoryChain } from '@/entities/category';
import type { FiltersState } from '../types';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetFiltersResponse
  extends FiltersState,
    AdditionalServerResponseData {
  categories: ProductListCategoryChain[];
}


export interface FilterRequestFormat {
    category_id: string | null;
    search: string | null;
    min_price: number | null;
    max_price: number | null;
    brands: number[];
    tags: string[];
    filters: {
      [key: number]: number[];
    };
    min_rating: number | null;
    max_rating: number | null;
  }
  

export interface GetFiltersRequest extends FilterRequestFormat {}
