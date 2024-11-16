import { FiltersState } from "../Filters/Filters";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface GetFiltersResponse extends FiltersState, AdditionalServerResponseData {
  }

 export  interface GetFiltersRequest {
    category_id: string;
    min_price: number | null;
    max_price: number | null;
    brands: number[];
    tags: string[];
    filters: {
        [key: number]: number[];
    };
    last_changed: {
        type: string;
        filter: string;
    };
}