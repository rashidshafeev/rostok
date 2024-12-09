import { Product } from "@customTypes/Product/Product";
import { AdditionalServerResponseData } from "../AdditionalServerResponseData";
import { BaseFilterParams } from "./common/BaseFilterParams";
import { PaginationParams } from "./common/PaginationParams";
import { SortingParams } from "./common/SortingParams";

export interface GetVariantsResponse extends AdditionalServerResponseData {
    count: number;
    data: Product[];
}

export interface GetVariantsRequest extends 
    BaseFilterParams,
    SortingParams,
    PaginationParams {}
