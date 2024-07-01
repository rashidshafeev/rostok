// cartEndpoints.js
import { api } from  './api';

export const cartEndpoints = (builder) => ({
    setCart: builder.mutation({
      query: (cart) => ({
        url: '/api/Products/setCart',
        method: 'POST',
        body: cart,
      }),
    }),
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
  });
  
  // Export hooks for cart endpoints
  export const {
    useSetCartMutation,
    useGetVariantsMutation,
    useGetSuggestionsMutation,
  } = api.injectEndpoints({ endpoints: cartEndpoints });