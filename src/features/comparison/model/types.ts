import type { ProductListCategoryChain } from '@/entities/category';
import type { Product } from '@/entities/product';

export interface ComparisonState {
  comparison: Product[];
  categories: ProductListCategoryChain[];
}
