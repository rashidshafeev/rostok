import { User } from "@customTypes/User/User";
import { AdditionalServerResponseData } from "./AdditionalServerResponseData";

export interface CartData {
    items_count: number;
    quantity: number;
}

export interface FavoritesData {
    items_count: number;
}

export interface ComparisonData {
    items_count: number;
}

export interface GetUserDataResponse extends AdditionalServerResponseData {
    user: User;
    cart: CartData;
    favorites: FavoritesData;
    comparison: ComparisonData;
}