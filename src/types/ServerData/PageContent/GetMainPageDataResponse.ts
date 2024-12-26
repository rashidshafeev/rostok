import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import { Product } from '@/types/Product/Product';
import { ImageSet } from '@/types/Common/ImageSet';

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
