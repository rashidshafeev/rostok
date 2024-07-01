// reviewEndpoints.js
import { api } from  './api';

export const changePassword = (builder) => ({
    changePassword: builder.mutation({
      query: (params) => ({
        url: '/api/Profile/updatePass',
        method: 'POST',
        body: params,
      }),
    }),
  });
  
  // Export hooks for review endpoints
  export const {
    useChangePasswordMutation,
  } = api.injectEndpoints({ endpoints: changePassword });