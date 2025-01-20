// src/features/catalog/model/api.ts

import { toast } from 'sonner';

import { api } from '@/shared/api/api';

import type { FilterGetPayload, FiltersResponse } from '@/entities/filter';
import type {
  GetVariantsRequest,
  GetVariantsResponse,
} from '@/entities/product';

export const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFilters: build.mutation<FiltersResponse, FilterGetPayload>({
      query: (body) => ({
        url: '/api/Products/filters',
        method: 'POST',
        body,
      }),
      // Add custom error handling for filters
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          toast.error('Не удалось загрузить фильтры', {
            description: 'Попробуйте обновить страницу',
            duration: 5000,
          });
        }
      },
    }),
    getProducts: build.mutation<GetVariantsResponse, GetVariantsRequest>({
      query: (body) => ({
        url: '/api/Products/variants',
        method: 'POST',
        body,
      }),
      // Add custom error handling for products
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          toast.error('Не удалось загрузить товары', {
            description:
              'Попробуйте обновить страницу или изменить параметры фильтрации',
            duration: 5000,
          });
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetFiltersMutation, useGetProductsMutation } = catalogApi;
