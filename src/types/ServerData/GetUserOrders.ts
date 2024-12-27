import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import type { Order } from '@/types/Orders/Order';

export interface GetUserOrdersResponse extends AdditionalServerResponseData {
  data: Order[];
}
