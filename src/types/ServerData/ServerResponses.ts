// ServerData.ts

import { ProductGroup } from "../ProductGroup/ProductGroup";
import { ServerCartState } from "../Store/Cart/CartState";

interface AdditionalServerResponseInfo {
  success: string | boolean;
  total_request_time: number;
  api_processing_time: number;
  sessid: string;
}

export interface GetUserCartResponse extends AdditionalServerResponseInfo, ServerCartState {
  };

export interface SendCartResponse extends AdditionalServerResponseInfo {
    data: [],
    total_amount: number,
    total_quantity: number,
}

export interface GetProductResponse extends AdditionalServerResponseInfo {
    data: ProductGroup
}