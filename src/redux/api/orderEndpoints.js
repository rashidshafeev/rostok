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
    }),
    getUserOrders: builder.query({
      query: () => '/api/Products/orders/get',
      providesTags: (result) =>
        result
          ? [{ type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }],
      refetchOnMountOrArgChange: true,
    }),
  });
  
  // Export hooks for order endpoints
  export const {
    useGetCitiesAndRegionsQuery,
    useSendOrderMutation,
    useGetUserOrdersQuery,
  } = api.injectEndpoints({ endpoints: orderEndpoints });