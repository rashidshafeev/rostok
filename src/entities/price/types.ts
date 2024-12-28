export interface Currency {
  code: string;
  title: string;
  symbol: string;
}

type Discount = {
  price: number;
  percent: number;
  discount_amount: number;
  reason: string | null;
};

export interface PriceType {
  base: number | null;
  final: number;
  discount: Discount | null;
  unit: string;
  currency: Currency | null;
  total?: number;
}
