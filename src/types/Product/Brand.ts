import { ImageSet } from "../Common/ImageSet";

export interface Brand {
    id: number;
    name: string;
    files?: ImageSet[];
  }