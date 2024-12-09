import { Product } from "../Product/Product";
import { OrderStatus } from "./OrderStatus";

interface OrderProduct extends Product {
    quantity: number;
  }

interface OrderTotals {
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
  