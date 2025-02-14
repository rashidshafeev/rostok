import { api } from '@/shared/api/api';

import type { GetUserOrdersResponse } from './types';

export interface ErrorResponse {
  // Added export
  data?: {
    err_code?: string;
  };
}

export interface OrderResponse {
  success: string;
  total_request_time: number;
  api_processing_time: number;
  sessid: string;
}

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCitiesAndRegions: builder.query({
      query: () => '/api/Location/full',
      staleTime: 60000,
    }),
    sendOrder: builder.mutation<OrderResponse, any>({
      query: (order) => ({
        url: '/api/Products/sendOrder',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: (result) => {
        if (result?.success === 'ok') {
          return [{ type: 'Order', id: 'LIST' }];
        }
        return [];
      },
    }),
    cancelOrder: builder.mutation<
      { success: string },
      { order_number: string; reason: string }
    >({
      query: (data) => ({
        url: '/api/ProductOrders/cancel/order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Order', id: 'LIST' },
        { type: 'Order', id: 'FILTERS' },
      ],
    }),
    getUserOrders: builder.query<GetUserOrdersResponse, void>({
      query: () => '/api/Products/orders/get',
      providesTags: (result) =>
        result
          ? [{ type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }],
      refetchOnMountOrArgChange: true,
    }),
    getOrdersFilters: builder.query({
      query: () => '/api/Products/orders/filters',
      providesTags: (result) =>
        result
          ? [{ type: 'Order', id: 'FILTERS' }]
          : [{ type: 'Order', id: 'FILTERS' }],
      refetchOnMountOrArgChange: true,
    }),
    sendFeedback: builder.mutation({
      query: (feedback) => ({
        url: '/api/Products/feedback',
        method: 'POST',
        body: feedback,
      }),
    }),
    repeatOrder: builder.mutation<
      { success: string; new_order_number: string },
      { order_number: string }
    >({
      query: (data) => ({
        url: '/api/ProductOrders/repeat/order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Order', id: 'LIST' },
        { type: 'Order', id: 'FILTERS' },
        { type: 'Cart', id: 'LIST' },
      ],
    }),
    createPDFOrder: builder.mutation<
      { success: string; file: Blob },
      { order_number: string }
    >({
      query: (data) => ({
        url: '/api/ProductOrders/create/pdf/order',
        method: 'POST',
        body: data,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return { success: 'ok', file: blob };
        },
      }),
    }),
  }),
});

export const {
  useGetCitiesAndRegionsQuery,
  useSendOrderMutation,
  useCancelOrderMutation,
  useGetUserOrdersQuery,
  useGetOrdersFiltersQuery,
  useSendFeedbackMutation,
  useRepeatOrderMutation,
  useCreatePDFOrderMutation,
} = orderApi;
