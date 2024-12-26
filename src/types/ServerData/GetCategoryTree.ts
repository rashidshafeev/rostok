import { CategoryWithImage } from "@/types/Category/ProductListCategoryChain";
import { CategoryFull } from "@/types/Category/CatgoryFull";
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetCategoryTreeResponse extends AdditionalServerResponseData {
  category: CategoryWithImage;
  category_chain: CategoryWithImage[];
  children: CategoryFull[];
}
