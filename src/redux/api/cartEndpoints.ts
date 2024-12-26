import { api } from  './api';
import { AdditionalServerResponseData } from '@customTypes/ServerData/AdditionalServerResponseData';
import { GetUserCartResponse } from '@customTypes/ServerData/GetUserCart';
import { SendCartResponse, SendCartRequest } from '@customTypes/ServerData/SendCart';
import { ProductListRequest } from '@customTypes/ServerData/ProductListRequest';
import { GetCartItemPriceRequest, GetCartItemPriceResponse } from '@customTypes/ServerData/GetCartItemPrice';

export const cartEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestions: builder.mutation({
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
    sendCart: builder.mutation<SendCartResponse, SendCartRequest>({
      query: (data) => ({
        url: '/api/ProductsCart/set',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { products }) => [
        { type: 'Cart', id: 'LIST' },
        { type: 'User', id: 'DATA' },
      ],
    }),
    removeFromCart: builder.mutation<AdditionalServerResponseData, ProductListRequest>({
      query: (data) => ({
        url: '/api/ProductsCart/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { products }) => [
        { type: 'Cart', id: 'LIST' },
        { type: 'User', id: 'DATA' },
      ],
    }),
    getCartItemPrice: builder.mutation<GetCartItemPriceResponse, GetCartItemPriceRequest>({
      query: (data) => ({
        url: '/api/Products/price/get',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }, { type: 'User', id: 'DATA' }],
    }),
    getCartShareCode: builder.mutation({
      query: () => ({
        url: '/api/ProductsCart/share/create',
        method: 'POST',
      }),
    }),
    getCartShareItemsByCode: builder.mutation({
      query: (data) => ({
        url: '/api/ProductsCart/share/get',
        method: 'POST',
        body: data,
      }),
    }),
    addSharedCart: builder.mutation({
      query: (data) => ({
        url: '/api/ProductsCart/share/add',
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
  useGetCartShareCodeMutation,
  useGetCartShareItemsByCodeMutation,
  useAddSharedCartMutation,
} = cartEndpoints
