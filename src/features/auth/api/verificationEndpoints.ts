import { api } from '@/shared/api/api';

export const verificationEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useSendVerificationCodeMutation,
  useConfirmVerificationCodeMutation,
} = verificationEndpoints;
