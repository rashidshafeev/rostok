// src/types/CatalogItem.ts

import { File } from './File';
import { Category } from './Category';
import { PriceType } from './PriceType';
import { Attribute } from './Attribute';
import { Tag } from './Tag';

export interface CatalogItem {
    id: number;
    relevance: number;
    groupId: number;
    sku: number;
    slug: string;
    name: string;
    groupName: string;
    fullName: string;
    description: string;
    files: File[];
    category: Category;
    price: PriceType;
    tags: Tag[] | null;
    brand: boolean;
    attributes: Attribute[];
}