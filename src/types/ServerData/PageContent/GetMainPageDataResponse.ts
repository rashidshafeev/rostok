import type { Product } from '@/entities/product/Product';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import type { ImageSet } from '@/shared/types/ImageSet';

export interface SliderItem {
  id: number;
  image: ImageSet[];
  title: string;
  text: string;
  url: string;
  btn_text: string;
  order: number | null;
}

export interface StaticBanner {
  picture: ImageSet;
  text: string;
  discount: string;
  background_color: string;
  text_color: string;
}

export interface LandingResponse extends AdditionalServerResponseData {
  slider: SliderItem[];
  newProducts: Product[];
  staticBaner: StaticBanner;
  withDiscount: Product[];
}
