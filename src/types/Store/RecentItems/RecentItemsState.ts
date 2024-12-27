import type { Product } from '@/entities/product/Product';

export interface RecentItemsProduct extends Product {
  visitTime: Date;
}

export interface RecentItemsState {
  recentItems: RecentItemsProduct[];
}
