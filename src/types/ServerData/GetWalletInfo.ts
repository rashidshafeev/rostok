import type { Currency } from '@/entities/price';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

interface Balance {
  sum: number;
  currency: Currency;
  currency2: string;
  sum_format: string;
  rate: number;
  rate_format: string;
  convertedAmount: string;
}

interface Wallet {
  name: string;
  isPrimary: number;
}

export interface GetWalletInfoResponse extends AdditionalServerResponseData {
  balances: Balance[];
  total: string;
  currentCurrency: Currency;
  wallet: Wallet;
}
