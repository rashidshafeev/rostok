import { User } from './User';
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetUserDataResponse extends AdditionalServerResponseData {
  user: User;
  cart: {
    items_count: number;
    quantity: number;
  };
  favorites: {
    items_count: number;
  };
  comparison: {
    items_count: number;
  };
}