// src/redux/api/userEndpoints.js
import { api } from './api';

export const userEndpoints = (builder) => ({
  authWithEmail: builder.mutation({
    query: (data) => ({
      url: '/api/User/auth',
      method: 'POST',
      body: data,
    }),
  }),
  getUserData: builder.query({
    query: () => ({
      url: '/api/UserData/get',
      method: 'GET',
    }),
    providesTags: [{ type: 'User', id: 'DATA' }],
    keepUnusedDataFor: 0,
  }),
});

// Export hooks for user endpoints
export const {
  useAuthWithEmailMutation,
  useGetUserDataQuery,
} = api.injectEndpoints({ endpoints: userEndpoints });
