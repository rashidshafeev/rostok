// src/redux/api/comparisonEndpoints.js
import { GetComparisonResponse } from '@/types/ServerData/Comparison/GetComparison';
import { api } from '@/shared/api/api';
import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import { ProductListRequest } from '@/types/ServerData/ProductListRequest';

export const comparisonEndpoints = api.injectEndpoints({ 
 endpoints: (builder) => ({
  getComparison: builder.query<GetComparisonResponse, void>({
    query: () => '/api/ProductsComparisons/get',
    providesTags: [{ type: 'Comparison', id: 'LIST' }],
  }),
  sendComparison: builder.mutation<AdditionalServerResponseData, ProductListRequest>({
    query: (data) => ({
      url: '/api/ProductsComparisons/set',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
  removeFromComparison: builder.mutation<AdditionalServerResponseData, ProductListRequest>({
    query: (data) => ({
      url: '/api/ProductsComparisons/delete',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
 })
})

// Export hooks for comparison endpoints
export const {
  useGetComparisonQuery,
  useSendComparisonMutation,
  useRemoveFromComparisonMutation,
} = comparisonEndpoints
