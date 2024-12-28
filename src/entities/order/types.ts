import type { Product } from '@/entities/product';

export interface OrderStatus {
  name: string;
  background_color: string;
  text_color: string;
}

export interface OrderProduct extends Product {
  quantity: number;
}

export interface OrderTotals {
  amount: number;
  quantity: number;
  discount: number;
}

export interface Order {
  order_number: string;
  date: string;
  status: OrderStatus;
  items: OrderProduct[];
  total: OrderTotals;
}
