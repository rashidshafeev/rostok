import type { Order } from '../types';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface GetUserOrdersResponse extends AdditionalServerResponseData {
  data: Order[];
}
