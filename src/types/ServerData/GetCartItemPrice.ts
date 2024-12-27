import { PriceType } from '@/shared/types/PriceType';
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetCartItemPriceResponse extends AdditionalServerResponseData {
  data: null | {
    item_id: number;
    price: PriceType;
  };
  total_amount: number;
  total_quantity: number;
}

export interface GetCartItemPriceRequest {
    item_id: number;
    quantity: number;
}