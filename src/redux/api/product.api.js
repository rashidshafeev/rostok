import { api } from "./api";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
          query: (id) => `api/Products/item?id=${id}`,
        }),
      }),
})
