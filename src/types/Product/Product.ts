// src/types/Product.ts

import { ImageSet } from '../Common/ImageSet';
import { Category } from '@/types/Category/Category';
import { PriceType } from './PriceType';
import { ModificationAttribute } from './ModificationAttribute';
import { Tag } from './Tag';
import { Brand } from './Brand';
import { AvailabilityState } from './AvailabilityState';

export interface Product {
    id: number;
    relevance: number;
    groupId: number;
    sku: number;
    slug: string;
    name: string;
    groupName: string;
    fullName: string;
    availability: AvailabilityState;
    description: string;
    files: ImageSet[];
    category: Category;
    price: PriceType;
    tags: Tag[] | false;
    brand: Brand | false;
    attributes: ModificationAttribute[];
}