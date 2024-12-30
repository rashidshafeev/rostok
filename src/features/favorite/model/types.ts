import type { ProductListCategoryChain } from '@/entities/category';
import type { Product } from '@/entities/product';

export interface FavoriteState {
  favorite: Product[];
  categories: ProductListCategoryChain[];
}
