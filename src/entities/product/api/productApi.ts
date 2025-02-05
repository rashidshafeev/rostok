// src/entities/product/api/productApi.ts
import { api } from '@/shared/api/api';

import type { GetProductResponse } from '@/entities/product/GetProduct';
import type {
  GetVariantsResponse,
  GetVariantsRequest,
} from '@/entities/product/GetVariants';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<GetProductResponse, string>({
      query: (id) => `api/Products/item?id=${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getVariants: builder.mutation<GetVariantsResponse, GetVariantsRequest>({
      query: (params) => ({
        url: '/api/Products/variants',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetProductQuery, useGetVariantsMutation } = productApi;
