export interface Review {
    rating: number;
    total_count: number;
    total_count_text: string;
    list: any[]; // Adjust the type of `list` based on the actual data structure
}