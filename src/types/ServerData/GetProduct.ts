import { ProductGroup } from "../ProductGroup/ProductGroup";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface GetProductResponse extends AdditionalServerResponseData {
    data: ProductGroup
}