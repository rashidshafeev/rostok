import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import type { BaseFilterParams } from '../../../entities/filter/common/BaseFilterParams';
import type { PaginationParams } from '../filter/common/PaginationParams';
import type { SortingParams } from '../filter/common/SortingParams';
import type { Product } from '../types';

export interface GetVariantsResponse extends AdditionalServerResponseData {
  count: number;
  data: Product[];
}

export interface GetVariantsRequest
  extends BaseFilterParams,
    SortingParams,
    PaginationParams {}


    import type { ProductGroup } from '../../types/ProductGroup/ProductGroup';

export interface GetProductResponse extends AdditionalServerResponseData {
  data: ProductGroup;
}
