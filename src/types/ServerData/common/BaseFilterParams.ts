export interface BaseFilterParams {
    category_id: string | null;
    search: string | null;
    min_price: number | null;
    max_price: number | null;
    brands: number[];
    tags: string[];
    filters: {
        [key: number]: number[];
    };
    min_rating: number | null;
    max_rating: number | null;
}
