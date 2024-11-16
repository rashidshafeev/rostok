import { Product } from "@/types/Product/Product";

export interface RecentItemsProduct extends Product {
    visitTime: Date;
}

export interface RecentItemsState {
    recentItems: RecentItemsProduct[]
}