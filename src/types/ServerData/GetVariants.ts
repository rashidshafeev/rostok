import { Product } from "@customTypes/Product/Product";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface GetVariantsResponse extends AdditionalServerResponseData {
    count: number;
    data: Product[];
}

export interface GetVariantsRequest {
    category_id: string;
    min_price: number | null;
    max_price: number;
    brands: number[];
    tags: string[];
    filters: {
        [key: number]: number[];
    };
    last_changed: {
        type: string;
        filter: string;
    };
    page: number;
    limit: number;
    orderBy: string;
    sortOrder: string;
}