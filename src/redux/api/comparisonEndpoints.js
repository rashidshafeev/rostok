// src/redux/api/comparisonEndpoints.js
import { api } from './api';

export const comparisonEndpoints = (builder) => ({
  getComparison: builder.query({
    query: () => '/api/ProductsComparisons/get',
    providesTags: [{ type: 'Comparison', id: 'LIST' }],
  }),
  sendComparison: builder.mutation({
    query: (data) => ({
      url: '/api/ProductsComparisons/set',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
  removeFromComparison: builder.mutation({
    query: (data) => ({
      url: '/api/ProductsComparisons/delete',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
});

// Export hooks for comparison endpoints
export const {
  useGetComparisonQuery,
  useSendComparisonMutation,
  useRemoveFromComparisonMutation,
} = api.injectEndpoints({ endpoints: comparisonEndpoints });
