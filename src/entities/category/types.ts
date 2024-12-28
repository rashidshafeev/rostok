import type { ImageSet } from '@/shared/types/ImageSet';

export interface ProductListCategoryChain {
  count: number;
  chain: CategoryWithImage[];
}

export interface CategoryBase {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryWithImage extends CategoryBase {
  image: ImageSet | false;
}

export interface CategoryFull extends CategoryBase {
  image: ImageSet | false;
  product_count: number;
  path: string;
  children?: CategoryFull[];
}
