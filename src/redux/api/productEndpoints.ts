// productEndpoints.js

import { api } from './api';
import { GetFiltersResponse, GetFiltersRequest } from '@customTypes/ServerData/Catalog/GetFilters';
import { GetVariantsRequest, GetVariantsResponse } from '@customTypes/ServerData/Catalog/GetVariants';
import { GetProductResponse } from '@customTypes/ServerData/GetProduct';
import { GetCategoryTreeResponse } from '@customTypes/ServerData/GetCategoryTree';


export const productEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
  getVariants: builder.mutation<GetVariantsResponse, GetVariantsRequest>({
    query: (params) => ({
      url: '/api/Products/variants',
      method: 'POST',
      body: params,
    }),
  }),
  getFilters: builder.mutation<GetFiltersResponse, GetFiltersRequest>({
    query: (params) => ({
      url: '/api/Products/filters',
      method: 'POST',
      body: params,
    }),
  }),
  getProduct: builder.query<GetProductResponse, string>({
    query: (id) => `api/Products/item?id=${id}`,
    keepUnusedDataFor: 60, // Keep cache for 60 seconds
  }),
  getCategoryTree: builder.query< GetCategoryTreeResponse, string | null>({
    query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
    keepUnusedDataFor: 60, // Keep cache for 60 seconds
  }),
  getBasicFilters: builder.query({
    query: () => `/api/Products/filters/basic`,
    keepUnusedDataFor: 60, // Keep cache for 60 seconds
  }),
})
})

export const {
  useGetVariantsMutation,
  useGetFiltersMutation,
  useGetProductQuery,
  useGetCategoryTreeQuery,
  useGetBasicFiltersQuery,
} = productEndpoints
