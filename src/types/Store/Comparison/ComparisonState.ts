import type { ProductListCategoryChain } from '@/entities/category/ProductListCategoryChain';
import type { Product } from '@/entities/product/Product';

export interface ComparisonState {
  comparison: Product[];
  categories: ProductListCategoryChain[];
}
