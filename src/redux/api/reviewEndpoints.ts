// reviewEndpoints.js
import { api } from  './api';

export const reviewEndpoints = (builder) => ({
    submitReview: builder.mutation({
      query: (data) => ({
        url: '/api/Products/review/set',
        method: 'POST',
        body: data,
      }),
    }),
  });
  
  // Export hooks for review endpoints
  export const {
    useSubmitReviewMutation,
  } = api.injectEndpoints({ endpoints: reviewEndpoints });