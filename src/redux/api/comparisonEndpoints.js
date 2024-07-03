// src/redux/api/comparisonEndpoints.js
import { api } from './api';

export const comparisonEndpoints = (builder) => ({
  getComparison: builder.query({
    query: () => '/api/ProductsComparison/get',
    providesTags: [{ type: 'Comparison', id: 'LIST' }],
  }),
  sendComparison: builder.mutation({
    query: (productId) => ({
      url: '/api/ProductsComparison/set',
      method: 'POST',
      body: { id: productId },
    }),
    invalidatesTags: [{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
  removeFromComparison: builder.mutation({
    query: (productId) => ({
      url: '/api/ProductsComparison/delete',
      method: 'POST',
      body: { id: productId },
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
