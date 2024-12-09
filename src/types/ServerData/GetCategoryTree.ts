import { CategoryWithImage } from "@/types/Category/ProductListCategoryChain";
import { CategoryFull } from "@customTypes/Category/CatgoryFull";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface GetCategoryTreeResponse extends AdditionalServerResponseData {
  category: CategoryWithImage;
  category_chain: CategoryWithImage[];
  children: CategoryFull[];
}
