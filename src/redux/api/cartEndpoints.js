// cartEndpoints.js
import { api } from  './api';

export const cartEndpoints = (builder) => ({
    // setCart: builder.mutation({
    //   query: (cart) => ({
    //     url: '/api/Products/setCart',
    //     method: 'POST',
    //     body: cart,
    //   }),
    // }),
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
    sendCart: builder.mutation({
      query: (cart) => ({
        url: '/api/ProductsCart/set',
        method: 'POST',
        body: cart,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsCart/delete',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    getUserCart: builder.query({
      query: () => ({
        url: '/api/ProductsCart/get',
        method: 'GET'
      }),
    }),
  });
  
  // Export hooks for cart endpoints
  export const {
    useSendCartMutation,
    useGetVariantsMutation,
    useGetSuggestionsMutation,
  } = api.injectEndpoints({ endpoints: cartEndpoints });