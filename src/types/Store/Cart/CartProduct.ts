import { Product } from "@customTypes/Product/Product";

export interface CartProduct extends Product {
    quantity: number;
    selected: boolean;
}