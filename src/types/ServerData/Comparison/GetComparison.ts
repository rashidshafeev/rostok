import { ProductListCategoryChain } from '@customTypes/Category/ProductListCategoryChain';
import { Product } from '@customTypes/Product/Product';
import { AdditionalServerResponseData } from '../AdditionalServerResponseData';

export interface GetComparisonResponse extends AdditionalServerResponseData {
    data: Product[];
    count: number;
    categories: ProductListCategoryChain[]
}