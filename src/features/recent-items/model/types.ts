import type { Product } from '@/entities/product';

export interface RecentItemsProduct extends Product {
  visitTime: Date;
}

export interface RecentItemsState {
  recentItems: RecentItemsProduct[];
}
