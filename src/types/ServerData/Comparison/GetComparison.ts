import { ProductListCategoryChain } from '@/types/Category/ProductListCategoryChain';
import { Product } from '@/types/Product/Product';
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetComparisonResponse extends AdditionalServerResponseData {
    data: Product[];
    count: number;
    category_chain: ProductListCategoryChain[]
}