// src/redux/api/comparisonEndpoints.js
import { GetComparisonResponse } from '@customTypes/ServerData/Comparison/GetComparison';
import { api } from './api';
import { AdditionalServerResponseData } from '@customTypes/ServerData/AdditionalServerResponseData';
import { ProductListRequest } from '@customTypes/ServerData/ProductListRequest';

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
