// productEndpoints.js

import { api } from './api';
import { GetFiltersResponse, GetFiltersRequest } from '@customTypes/ServerData/GetFilters';
import { GetVariantsRequest, GetVariantsResponse } from '@customTypes/ServerData/GetVariants';
import { GetProductResponse } from '@customTypes/ServerData/GetProduct';


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
    staleTime: 60000,
  }),
  getCategoryTree: builder.query({
    query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
    staleTime: 60000,
  }),
  getBasicFilters: builder.query({
    query: () => `/api/Products/filters/basic`,
    staleTime: 60000,
  }),
  getMainPageData: builder.query({
    query: () => `api/PageContent/get?target=landing`,
  }),
})
})

export const {
  useGetVariantsMutation,
  useGetFiltersMutation,
  useGetProductQuery,
  useGetCategoryTreeQuery,
  useGetBasicFiltersQuery,
  useGetMainPageDataQuery,
} = productEndpoints
