import type { Product } from '@/entities/product/Product';

export interface CartProduct extends Product {
  quantity: number;
  selected: boolean;
}
