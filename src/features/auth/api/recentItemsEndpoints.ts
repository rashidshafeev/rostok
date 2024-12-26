import { api } from '@/shared/api/api';

export const recentItemsEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentItems: builder.query({
      query: () => ({
        url: "/api/Products/recentlyViewed",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "RECENT-ITEMS" }],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetRecentItemsQuery } = recentItemsEndpoints;