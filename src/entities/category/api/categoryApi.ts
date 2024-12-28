// src/entities/category/api/categoryApi.ts
import { api } from '@/shared/api/api';

import type { GetCategoryTreeResponse } from './types';

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryTree: builder.query<GetCategoryTreeResponse, string | null>({
      query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetCategoryTreeQuery } = categoryApi;
