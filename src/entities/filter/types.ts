export interface SelectableItem {
    is_active: boolean;
    is_selected: boolean;
  }
  
import type { BaseFilterParams } from '../ServerData/Catalog';


interface DynamicFilterValue extends SelectableItem {
  id: number;
  text: string;
  color?: string;
  second_color?: string | null;
}

enum FilterType {
  COLOR = 'color',
  TEXT = 'text',
}

export interface DynamicFilter {
  is_active: boolean;
  id: number;
  name: string;
  type: FilterType;
  values: DynamicFilterValue[];
}

import type { ImageSet } from '@/shared/types/ImageSet';

export interface PriceFilter {
  min: number;
  max: number;
  current_values?: {
    min: number;
    max: number;
  };
}

export interface TagFilter extends SelectableItem {
  tag: string;
  text_color: string;
  background_color: string;
}

export interface BrandFilter extends SelectableItem {
  id: number;
  name: string;
  image: ImageSet;
  code: string;
}


export interface FiltersState {
    page(arg0: BaseFilterParams, page: any): unknown;
    basics: {
      price: PriceFilter | false;
      tags: TagFilter[];
      brands: BrandFilter[];
      rating: number[];
    };
    dynamics: DynamicFilter[];
    more: DynamicFilter[];
  }
  

 