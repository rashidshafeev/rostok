// src/redux/api/userEndpoints.js
import { api } from './api';

export const userEndpoints = (builder) => ({
  userRegister: builder.mutation({
    query: (data) => ({
      url: '/api/User/register',
      method: 'POST',
      body: data,
    }),
  }),
  registrationCheck: builder.mutation({
    query: (data) => ({
      url: '/api/User/check',
      method: 'POST',
      body: data,
    }),
  }),
  sendVerificationCode: builder.mutation({
    query: (data) => ({
      url: '/api/User/phone/sendVerificationCode',
      method: 'POST',
      body: data,
    }),
  }),
  confirmVerificationCode: builder.mutation({
    query: (data) => ({
      url: '/api/User/phone/confirmVerificationCode',
      method: 'POST',
      body: data,
    }),
  }),
  authWithEmail: builder.mutation({
    query: (data) => ({
      url: '/api/User/auth',
      method: 'POST',
      body: data,
    }),
  }),
  resetPassword: builder.mutation({
    query: (email) => ({
      url: '/api/User/sendPasswordResetLink',
      method: 'POST',
      body: { email: email },
    }),
  }),
  changePassword: builder.mutation({
    query: (params) => ({
      url: '/api/Profile/updatePass',
      method: 'POST',
      body: params,
    }),
  }),
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

  getRecentItems: builder.query({
    query: () => ({
      url: '/api/Products/recentlyViewed',
      method: 'GET',
    }),
    providesTags: [{ type: 'User', id: 'RECENT-ITEMS' }],
    keepUnusedDataFor: 0,
    refetchOnFocus: true,
  }),
});

// Export hooks for user endpoints
export const {
  useUserRegisterMutation,
  useRegistrationCheckMutation,
  useSendVerificationCodeMutation,
  useConfirmVerificationCodeMutation,
  useAuthWithEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetUserDataQuery,
  useChangeUserDataMutation,
  useGetRecentItemsQuery,
} = api.injectEndpoints({ endpoints: userEndpoints });
