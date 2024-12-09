import { ProductListCategoryChain } from '@customTypes/Category/ProductListCategoryChain';
import { Product } from '@customTypes/Product/Product';
import { AdditionalServerResponseData } from '../AdditionalServerResponseData';

export interface GetFavoriteResponse extends AdditionalServerResponseData {
    data: Product[];
    count: number;
    category_chain: ProductListCategoryChain[]
}