
import { AdditionalServerResponseData } from './AdditionalServerResponseData';
import { Order } from '@/types/Orders/Order';

export interface GetUserOrdersResponse extends AdditionalServerResponseData {
  data: Order[];
}
