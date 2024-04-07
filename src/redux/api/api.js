import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bot-adash.host2bot.ru/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
          query: (id) => `api/Products/item?id=${id}`,
          // keepUnusedDataFor: 5
        }),
        getCategoryTree: builder.query({
            query: () => `api/Products/categoryTree`,
          }),
        getProductsByCategory: builder.query({
          query: (id) => `api/Products/variantsByCategory?parent_category=${id}`,
          // query: (id) => `api/Products/variants?category_id=${id}`,
          }),
       
      }),
  })

export const { useGetProductsQuery, useLazyGetProductsQuery, useGetCategoryTreeQuery, useGetProductsByCategoryQuery } = api