import { ImageSet } from "@/types/Common/ImageSet";
import { SelectableItem } from "./SelectableItem";

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
  