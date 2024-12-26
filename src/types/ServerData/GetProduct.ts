import { ProductGroup } from "../ProductGroup/ProductGroup";
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetProductResponse extends AdditionalServerResponseData {
    data: ProductGroup
}