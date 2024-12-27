import type { ProductListCategoryChain } from '@/entities/category/ProductListCategoryChain';
import type { Product } from '@/entities/product/Product';
import type { User } from '@/entities/user/User';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface CartData {
  items_count: number;
  quantity: number;
}

export interface FavoritesData {
  items_count: number;
}

export interface ComparisonData {
  items_count: number;
}

export interface GetUserDataResponse extends AdditionalServerResponseData {
  user: User;
  cart: CartData;
  favorites: FavoritesData;
  comparison: ComparisonData;
}

export interface GetFavoriteResponse extends AdditionalServerResponseData {
  data: Product[];
  count: number;
  category_chain: ProductListCategoryChain[];
}

export interface GetComparisonResponse extends AdditionalServerResponseData {
  data: Product[];
  count: number;
  category_chain: ProductListCategoryChain[];
}
