import { ServerCartState } from "../Store/Cart/CartState";
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetUserCartResponse extends AdditionalServerResponseData, ServerCartState {
};
