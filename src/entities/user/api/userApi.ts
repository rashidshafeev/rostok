import { api } from '@/shared/api/api';

import type { GetUserDataResponse } from './types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<GetUserDataResponse, void>({
      query: () => ({
        url: '/api/UserData/get',
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'DATA' }],
      keepUnusedDataFor: 0,
      refetchOnFocus: true,
    }),
    changeUserData: builder.mutation({
      query: (data) => ({
        url: '/api/Profile/saveInfo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'DATA' }],
    }),
  }),
});

export const { useGetUserDataQuery, useChangeUserDataMutation } = userApi;
