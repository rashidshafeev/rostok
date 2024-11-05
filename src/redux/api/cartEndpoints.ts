// cartEndpoints.js
import { api } from  './api';
import { GetUserCartResponse } from '@customTypes/ServerData/ServerResponses';
import { SendCartRequest } from '@customTypes/ServerData/ServerRequests';


export const cartEndpoints = api.injectEndpoints({
endpoints: (builder) => ({
    getSuggestions: builder.mutation({
    // getSuggestions: builder.mutation<SendCartResponse, SendCartRequest>({}
      query: (params) => ({
        url: '/api/Products/search/suggestions',
        method: 'POST',
        body: params,
      }),
    }),
    getUserCart: builder.query<GetUserCartResponse, void>({
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
    getCartItemPrice: builder.mutation({
      query: (data) => ({
        url: '/api/Products/price/get',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }, { type: 'User', id: 'DATA' }],
    })
  })
})
  
  // Export hooks for cart endpoints
  export const {
    useSendCartMutation,
    useGetSuggestionsMutation,
    useGetUserCartQuery,
    useRemoveFromCartMutation,
    useGetCartItemPriceMutation,
  } = cartEndpoints

