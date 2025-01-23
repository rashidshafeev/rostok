import { api } from '@/shared/api/api';

import type {
  CartShareCodeResponse,
  CartShareItemsResponse,
} from './types';

export const cartShareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartShareCode: builder.mutation<CartShareCodeResponse, void>({
      query: () => ({
        url: '/ProductsCart/share/get',
        method: 'POST',
      }),
    }),
    getCartShareItemsByCode: builder.mutation<CartShareItemsResponse, string>({
      query: (code) => ({
        url: `/ProductsCart/share/${code}`,
        method: 'GET',
      }),
    }),
    addSharedCart: builder.mutation<void, { code: string }>({
      query: (body) => ({
        url: '/ProductsCart/share/add',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetCartShareCodeMutation,
  useGetCartShareItemsByCodeMutation,
  useAddSharedCartMutation,
} = cartShareApi;
