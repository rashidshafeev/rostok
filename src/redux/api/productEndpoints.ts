// productEndpoints.js
import { GetProductResponse } from '@customTypes/ServerData/ServerResponses';
import { api } from './api';

export const productEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
  getVariants: builder.mutation({
    query: (params) => ({
      url: '/api/Products/variants',
      method: 'POST',
      body: params,
    }),
  }),
  getFilters: builder.mutation({
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

// Inject endpoints into the api
// const injectedEndpoints = api.injectEndpoints({ endpoints: productEndpoints });

// Export hooks for product endpoints
export const {
  useGetVariantsMutation,
  useGetFiltersMutation,
  useGetProductQuery,
  // useLazyGetProductQuery,
  useGetCategoryTreeQuery,
  useGetBasicFiltersQuery,
  // useGetProductsByCategoryQuery,
  // useGetFiltersOfProductsQuery,
  useGetMainPageDataQuery,
} = productEndpoints
