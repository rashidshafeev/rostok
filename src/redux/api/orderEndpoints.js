import { api } from  './api';

export const orderEndpoints = (builder) => ({
    getCitiesAndRegions: builder.query({
      query: () => '/api/Location/full',
      staleTime: 60000,
    }),
    sendOrder: builder.mutation({
      query: (order) => ({
        url: '/api/Products/sendOrder',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Order', id: 'LIST' },
        { type: 'Order', id: 'FILTERS' },
      ],
    }),
    getUserOrders: builder.query({
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
        url: '/api/Feedback/send',
        method: 'POST',
        body: feedback,
      })
    })
  });
  
  // Export hooks for order endpoints
  export const {
    useGetCitiesAndRegionsQuery,
    useSendOrderMutation,
    useGetUserOrdersQuery,
    useGetOrdersFiltersQuery,
    useSendFeedbackMutation
  } = api.injectEndpoints({ endpoints: orderEndpoints });