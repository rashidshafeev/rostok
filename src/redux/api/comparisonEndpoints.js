// comparisonEndpoints.js
import { api } from  './api';

export const comparisonEndpoints = (builder) => ({
    getComparison: builder.query({
      query: () => '/api/ProductsFavourites/get',
      providesTags: (result) =>
        result
          ? [{ type: 'Comparison', id: 'LIST' }]
          : [{ type: 'Comparison', id: 'LIST' }],
    }),
    sendComparison: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsFavourites/set',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Comparison', id: 'LIST' }],
    }),
    removeFromComparison: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsFavourites/delete',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Comparison', id: 'LIST' }],
    }),
  });
  
  // Export hooks for favorites endpoints
  export const {
    useGetComparisonQuery,
    useSendComparisonMutation,
    useRemoveFromComparisonMutation,
  } = api.injectEndpoints({ endpoints: comparisonEndpoints });