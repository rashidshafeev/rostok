import type { CategoryBase } from '@/entities/category';
import type { PriceType } from '@/entities/price';
import type { DateType } from '@/shared/types/DateType';
import type { ImageSet } from '@/shared/types/ImageSet';

export interface Tag {
  text: string;
  text_color: string;
  background_color: string;
}

export interface Brand {
  id: number;
  name: string;
  files?: ImageSet[];
}
export interface ModificationAttribute {
  id: number;
  value: number;
  sorting: number;
  name: string;
  type: string;
  text: string;
  color?: string;
  second_color?: string;
}

export interface Currency {
  code: string;
  title: string;
  symbol: string;
}

export interface AvailabilityState {
  stock: number;
  preorder: DateType | null;
}
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
  category: CategoryBase;
  price: PriceType;
  tags: Tag[] | false;
  brand: Brand | false;
  attributes: ModificationAttribute[];
}

export interface Review {
  rating: number;
  total_count: number;
  total_count_text: string;
  list: any[]; // Adjust the type of `list` based on the actual data structure
}

export interface Attribute {
  id: number;
  name: string;
  type: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  type: string;
  text: string;
}

export interface ProductGroup {
  name: string;
  sku: number;
  slug: string;
  description: string;
  attributes: Attribute[];
  category_chain: CategoryBase[];
  variants: Product[];
  reviews: Review;
}
