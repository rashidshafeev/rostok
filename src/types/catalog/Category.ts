export interface Category {
    id: number;
    name: string;
    slug: string;
    product_count: number;
    children?: Category[];
    image?: {
        large?: string;
        small?: string;
    };
} 