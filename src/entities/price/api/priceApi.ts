import { api } from '@/shared/api/api';

import type {
  GetCartItemPriceRequest,
  GetCartItemPriceResponse,
} from './types';

export const priceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemPrice: builder.mutation<
      GetCartItemPriceResponse,
      GetCartItemPriceRequest
    >({
      query: (data) => ({
        url: '/api/Products/price/get',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'LIST' },
        { type: 'User', id: 'DATA' },
      ],
    }),
  }),
});

export const { useGetCartItemPriceMutation } = priceApi;
