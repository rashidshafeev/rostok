// src/types/Product.ts

import { File } from './File';
import { Category } from '@customTypes/Category/Category';
import { PriceType } from './PriceType';
import { ModificationAttribute } from './ModificationAttribute';
import { Tag } from './Tag';
import { Brand } from './Brand';

export interface Product {
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
    tags: Tag[] | false;
    brand: Brand | false;
    attributes: ModificationAttribute[];
}