import type { ProductListCategoryChain } from '@/entities/category';
import type { Product } from '@/entities/product';
import type { AdditionalServerResponseData } from '@/shared/types';

export interface GetFavoriteResponse extends AdditionalServerResponseData {
  data: Product[];
  count: number;
  category_chain: ProductListCategoryChain[];
}
