// reviewEndpoints.js
import { api } from  './api';

export const reviewEndpoints = (builder) => ({
    submitReview: builder.mutation({
      query: (params) => ({
        url: '/api/submitReview',
        method: 'POST',
        body: params,
      }),
    }),
  });
  
  // Export hooks for review endpoints
  export const {
    useSubmitReviewMutation,
  } = api.injectEndpoints({ endpoints: reviewEndpoints });