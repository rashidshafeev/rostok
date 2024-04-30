import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bot-adash.host2bot.ru/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `api/Products/item?id=${id}`,
    }),
    getCategoryTree: builder.query({
      query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
      keepUnusedDataFor: 5,
    }),
    getProductsByCategory: builder.query({
      query: (id, page) =>
        `api/Products/variants?page=${page}&category_id=${id}`,
    }),
    getFiltersOfProducts: builder.query({
      query: (id) => `api/Products/filters/?category_id=${id || ''}`,
    }),
    getCitiesAndRegions: builder.query({
      query: () => '/api/Location/full',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  useGetFiltersOfProductsQuery,
  useGetCitiesAndRegionsQuery,
} = api;
