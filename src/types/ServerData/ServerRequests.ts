export interface SendCartPayload {
    id: number;
    quantity: number;
    selected: boolean;
}

export type SendCartRequest = SendCartPayload | { items: SendCartPayload[] };
