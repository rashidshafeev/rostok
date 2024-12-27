import { CategoryWithImage, CategoryFull  } from "@/entities/category";
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetCategoryTreeResponse extends AdditionalServerResponseData {
  category: CategoryWithImage;
  category_chain: CategoryWithImage[];
  children: CategoryFull[];
}
