import { Product } from "@/types/Product/Product";
import { ProductListCategoryChain } from "@/types/Category/ProductListCategoryChain";

export interface FavoriteState {
    favorite: Product[];
    categories: ProductListCategoryChain[];
}