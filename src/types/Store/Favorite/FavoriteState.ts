import type { ProductListCategoryChain } from '@/entities/category/ProductListCategoryChain';
import type { Product } from '@/entities/product/Product';

export interface FavoriteState {
  favorite: Product[];
  categories: ProductListCategoryChain[];
}
