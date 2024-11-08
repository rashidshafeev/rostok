import { User } from "@customTypes/User/User";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface Cart {
    items_count: number;
    quantity: number;
}

export interface Favorites {
    items_count: number;
}

export interface Comparison {
    items_count: number;
}


export interface GetUserDataResponse extends AdditionalServerResponseData {
    user: User;
    cart: Cart;
    favorites: Favorites;
    comparison: Comparison;
}