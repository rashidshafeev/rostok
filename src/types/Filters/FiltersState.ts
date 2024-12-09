import { Category } from "@customTypes/Category/Category";
import { BrandFilter } from "./BasicFilters";
import { TagFilter } from "./BasicFilters";
import { DynamicFilter } from "./DynamicFilter";
import { PriceFilter } from "./BasicFilters";
import { BaseFilterParams } from "../ServerData/Catalog";

export interface FiltersState {
    page(arg0: BaseFilterParams, page: any): unknown;
    basics:  {
      price: PriceFilter | false;
      tags: TagFilter[];
      brands: BrandFilter[];
      rating: number[];
    };
    dynamics: DynamicFilter[];
    more: DynamicFilter[];
  }
