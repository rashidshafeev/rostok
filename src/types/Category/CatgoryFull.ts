import { ImageSet } from "@customTypes/Common/ImageSet";
import { Category } from "./Category";

export interface CategoryFull extends Category {
    image: ImageSet | false;
    product_count: number;
    path: string;
    children?: CategoryFull[];
}