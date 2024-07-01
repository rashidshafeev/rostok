// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { useSubmit } from 'react-router-dom';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://bot-adash.host2bot.ru/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       console.log("headers");
//       console.log(headers);
//       console.log(token);
//       return headers;
//     },
//     credentials: 'include',
//   }),
//   tagTypes: ['Favorite'],
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: (id) => `api/Products/item?id=${id}`,
//       staleTime: 60000,
//     }),
//     getCategoryTree: builder.query({
//       query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
//       staleTime: 60000,
//     }),
//     getProductsByCategory: builder.query({
//       query: (params) => {
//         const { categoryId, page } = params;
//         return `api/Products/variants?page=${page}&category_id=${categoryId}`;
//       },
//       staleTime: 60000,
//     }),
//     getFiltersOfProducts: builder.query({
//       query: (id) => `api/Products/filters/?category_id=${id || ''}`,
//       staleTime: 60000,
//     }),
//     getCitiesAndRegions: builder.query({
//       query: () => '/api/Location/full',
//       staleTime: 60000,
//     }),
//     sendOrder: builder.mutation({
//       query: (order) => ({
//         url: '/api/Products/sendOrder',
//         method: 'POST',
//         body: order,
//       }),
//     }),
//     getFavorites: builder.query({
//       query: () => '/api/ProductsFavourites/get',
//       providesTags: (result) =>
//         result
//           ? [{ type: 'Favorite', id: 'LIST' }]
//           : [{ type: 'Favorite', id: 'LIST' }],
//     }),
//     getUserOrders: builder.query({
//       query: () => '/api/Products/orders/get',
//       providesTags: (result) =>
//         result
//           ? [{ type: 'Order', id: 'LIST' }]
//           : [{ type: 'Order', id: 'LIST' }],
//           refetchOnMountOrArgChange: true,

//     }),
//     setToFavorites: builder.mutation({
//       query: (productId) => ({
//         url: '/api/ProductsFavourites/set',
//         method: 'POST',
//         body: { id: productId },
//       }),
//       invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
//     }),
//     removeFromFavorites: builder.mutation({
//       query: (productId) => {
//         return {
//           url: `/api/ProductsFavourites/delete`,
//           method: 'POST',
//           body: { id: productId },
//         };
//       },
//       invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
//     }),
//     setCart: builder.mutation({
//       query: (cart) => ({
//         url: '/api/Products/setCart',
//         method: 'POST',
//         body: cart,
//       }),
//     }),
//     getVariants: builder.mutation({
//       query: (params) => ({
//         url: '/api/Products/variants',
//         method: 'POST',
//         body: params, // Send parameters as the body of the POST request
//       }),
//     }),
//     getSuggestions: builder.mutation({
//       query: (params) => ({
//         url: '/api/Products/search/suggestions',
//         method: 'POST',
//         body: params, // Send parameters as the body of the POST request
//       }),
//     }),
//     submitReview: builder.mutation({
//       query: (params) => ({
//         url: '/api/submitReview',
//         method: 'POST',
//         body: params, // Send parameters as the body of the POST request
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useLazyGetProductsQuery,
//   useGetCategoryTreeQuery,
//   useGetProductsByCategoryQuery,
//   useGetFiltersOfProductsQuery,
//   useGetCitiesAndRegionsQuery,
//   useGetUserOrdersQuery,
//   useSendOrderMutation,
//   useGetFavoritesQuery,
//   useSetToFavoritesMutation,
//   useRemoveFromFavoritesMutation,
//   useSetCartMutation,
//   useGetVariantsMutation,
//   useGetSuggestionsMutation,
//   useSubmitReviewMutation,
// } = api;

// api.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { productEndpoints } from './productEndpoints';
// import { orderEndpoints } from './orderEndpoints';
// import { favoritesEndpoints } from './favoritesEndpoints';
// import { cartEndpoints } from './cartEndpoints';
// import { reviewEndpoints } from './reviewEndpoints';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://bot-adash.host2bot.ru/',
//     prepareHeaders: (headers, { getState }) => {

//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },yytr
//     credentials: 'include',
//   }),
//   tagTypes: ['Favorite', 'Order'],
//   endpoints: (builder) => ({
//     ...productEndpoints(builder),
//     ...orderEndpoints(builder),
//     ...favoritesEndpoints(builder),
//     ...cartEndpoints(builder),
//     ...reviewEndpoints(builder),
//   }),
// });

// src/redux/api/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bot-adash.host2bot.ru/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Favorite', 'Order'],
  endpoints: () => ({}), // Initially empty, endpoints will be injected later
});