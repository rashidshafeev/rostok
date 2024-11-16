import { Product } from '@customTypes/Product/Product';
import { Attribute } from './Attribute';
import { Category } from '../Category/Category';
import { Review } from './Review';


export interface ProductGroup {
    name: string;
    sku: number;
    slug: string;
    description: string;
    attributes: Attribute[];
    category_chain: Category[];
    variants: Product[];
    reviews: Review;
}

