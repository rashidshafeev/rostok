// src/types/Price.ts
import { Currency } from "./Currency";

type Discount = {
    price: number;
    percent: number;
    reason: string | null;
};

export interface PriceType {
    base: number | null;
    final: number;
    discount: Discount | null;
    unit: string;
    currency: Currency | null;
    total_price?: number;
}
// export interface GeneralPriceType {
//     base: number;
//     final: number;
//     discount: Discount | null;
//     unit: string;
//     currency: Currency | null;
// }

// // PriceType for cart product
// export interface CartPriceType extends GeneralPriceType {
//     total_price?: number;
// }

// // Union type for price that can be either GeneralPriceType or CartPriceType
// export type PriceType = GeneralPriceType | CartPriceType;