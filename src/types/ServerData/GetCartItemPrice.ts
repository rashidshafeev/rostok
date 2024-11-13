import { PriceType } from "../Product/PriceType";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

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