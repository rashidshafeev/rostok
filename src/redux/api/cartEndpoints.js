// cartEndpoints.js
import { api } from  './api';

export const cartEndpoints = (builder) => ({
    getVariants: builder.mutation({
      query: (params) => ({
        url: '/api/Products/variants',
        method: 'POST',
        body: params,
      }),
    }),
    getSuggestions: builder.mutation({
      query: (params) => ({
        url: '/api/Products/search/suggestions',
        method: 'POST',
        body: params,
      }),
    }),
    getUserCart: builder.query({
      query: () => '/api/ProductsCart/get',
      providesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    sendCart: builder.mutation({
      query: (data) => ({
        url: '/api/ProductsCart/set',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }, { type: 'User', id: 'DATA' }],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: '/api/ProductsCart/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }, { type: 'User', id: 'DATA' }],
    }),
    
  });
  
  // Export hooks for cart endpoints
  export const {
    useSendCartMutation,
    useGetVariantsMutation,
    useGetSuggestionsMutation,
    useGetUserCartQuery,
    useRemoveFromCartMutation
  } = api.injectEndpoints({ endpoints: cartEndpoints });