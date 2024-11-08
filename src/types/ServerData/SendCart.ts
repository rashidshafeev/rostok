import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface SendCartPayload {
    id: number;
    quantity: number;
    selected: boolean;
}

export type SendCartRequest = SendCartPayload | { items: SendCartPayload[] };

export interface SendCartResponse extends AdditionalServerResponseData {
    data: [],
    total_amount: number,
    total_quantity: number,
}
