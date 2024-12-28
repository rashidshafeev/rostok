// src/entities/filter/api/filterApi.ts
import { api } from '@/shared/api/api';

import type {
  GetFiltersResponse,
  GetFiltersRequest,
} from '@/entities/filter/GetFilters';

export const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilters: builder.mutation<GetFiltersResponse, GetFiltersRequest>({
      query: (params) => ({
        url: '/api/Products/filters',
        method: 'POST',
        body: params,
      }),
    }),
    getBasicFilters: builder.query<any, void>({
      query: () => '/api/Products/filters/basic',
      keepUnusedDataFor: 60,
    }),
  }),
});
