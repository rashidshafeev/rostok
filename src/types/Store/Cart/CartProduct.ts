import { Product } from "@/types/Product/Product";

export interface CartProduct extends Product {
    quantity: number;
    selected: boolean;
}