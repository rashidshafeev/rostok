import { api } from '@/shared/api/api';

export const authenticationEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    registrationCheck: builder.mutation({
      query: (data) => ({
        url: '/api/User/check',
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
    userRegister: builder.mutation({
      query: (data) => ({
        url: '/api/User/register',
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
  }),
});

export const {
  useRegistrationCheckMutation,
  useAuthWithEmailMutation,
  useUserRegisterMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authenticationEndpoints;
