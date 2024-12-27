import type { Product } from '@/entities/product';
import type { Currency } from '@/shared/types/Currency';

export interface LocalCartState {
  cart: CartProduct[];
  total: CartTotals;
  selected: CartTotals;
  currency: Currency;
}

export interface CartProduct extends Product {
  quantity: number;
  selected: boolean;
}

export interface CartTotals {
  items_count: number;
  quantity: number;
  price_before_discount: number;
  discount: number;
  price_after_discount: number;
}

export type CartModalType = 'showSharedCart' | 'shareCart';
