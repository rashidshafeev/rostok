import type { AdditionalServerResponseData, PriceType } from '@/shared/types';

export interface GetUserCartResponse
  extends AdditionalServerResponseData,
    ServerCartState {}

export interface SendCartPayload {
  id: number;
  quantity: number;
  selected: boolean;
}

export interface SendCartPayload {
  id: number;
  quantity: number;
  selected: boolean;
}

export type SendCartRequest = SendCartPayload | { items: SendCartPayload[] };

export interface SendCartResponse extends AdditionalServerResponseData {
  data: [];
  total_amount: number;
  total_quantity: number;
}
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

export interface GetCartShareLinkResponse {
  data: string;
}
