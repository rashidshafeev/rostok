// productEndpoints.js
import { api } from './api';

export const productEndpoints = (builder) => ({
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
  getProducts: builder.query({
    query: (id) => `api/Products/item?id=${id}`,
    staleTime: 60000,
  }),
  getCategoryTree: builder.query({
    query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
    staleTime: 60000,
  }),
  getMainPageData: builder.query({
    query: () => `api/PageContent/get?target=landing`,
  }),
});

// Inject endpoints into the api
// const injectedEndpoints = api.injectEndpoints({ endpoints: productEndpoints });

// Export hooks for product endpoints
export const {
  useGetVariantsMutation,
  useGetFiltersMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  useGetFiltersOfProductsQuery,
  useGetMainPageDataQuery,
} = api.injectEndpoints({ endpoints: productEndpoints });
