// src/types/Price.ts

type Currency = {
    code: string;
    title: string;
    symbol: string;
};

type Discount = {
    price: number;
    percent: number;
    reason: string | null;
};

export interface PriceType {
    base: number;
    final: number;
    discount: Discount | null;
    unit: string;
    currency: Currency | null;
}