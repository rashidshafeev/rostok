import { Category } from "./Category";
import { ImageSet } from "../Common/ImageSet";

interface CategoryWithImage extends Category {
    image: ImageSet | false;
}

export interface ProductListCategoryChain {
    count: number;
    chain: CategoryWithImage[]
}