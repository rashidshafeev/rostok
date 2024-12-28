import { api } from '@/shared/api/api';

import type { GetUserDataResponse } from '../../../features/auth/api/types';

export const profileEndpoints = api.injectEndpoints({
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

export const { useGetUserDataQuery, useChangeUserDataMutation } =
  profileEndpoints;
