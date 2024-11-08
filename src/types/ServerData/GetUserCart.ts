import { ServerCartState } from "../Store/Cart/CartState";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface GetUserCartResponse extends AdditionalServerResponseData, ServerCartState {
};
