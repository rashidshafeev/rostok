import { ProductListCategoryChain } from "../../Category/ProductListCategoryChain";
import { FiltersState } from "../../Filters/FiltersState";
import { AdditionalServerResponseData } from "../AdditionalServerResponseData";
import { BaseFilterParams } from "./common/BaseFilterParams";

export interface GetFiltersResponse extends FiltersState, AdditionalServerResponseData {
    categories: ProductListCategoryChain[];
}

export interface GetFiltersRequest extends BaseFilterParams {}
