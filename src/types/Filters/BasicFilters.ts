import { ImageSet } from "@customTypes/Common/ImageSet";
import { SelectableItem } from "./SelectableItem";

export interface PriceFilter {
    min: number;
    max: number;
    current_values: {
      min: number;
      max: number;
    };
  }
  
  interface Tag extends SelectableItem {
      tag: string;
      text_color: string;
      background_color: string;
  }
  
  interface Brand extends SelectableItem {
      id: number;
      name: string;
      image: ImageSet;
      code: string;
    }
  