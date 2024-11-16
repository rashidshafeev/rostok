import { Category } from "@customTypes/Category/Category";
import { Brand } from "../Product/Brand";
import { Tag } from "../Product/Tag";
import { DynamicFilter } from "./DynamicFilter";
import { PriceFilter } from "./BasicFilters";

export interface FiltersState {
    basics:  {
      price: PriceFilter;
      tags: Tag[];
      brands: Brand[];
      rating: number[];
    };
    dynamics: DynamicFilter[];
    more: DynamicFilter[];
    category_chain: Category[];
  }
