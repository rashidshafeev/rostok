import { Product } from "@/types/Product/Product";
import { ProductListCategoryChain } from "@/types/Category/ProductListCategoryChain";

export interface ComparisonState {
    comparison: Product[];
    categories: ProductListCategoryChain[];
}