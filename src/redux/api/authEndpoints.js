// authEndpoints.js
import { api } from  './api';

export const authEndpoints = (builder) => ({
    authWithEmail: builder.mutation({query: ({ email, password })  =>  ({
       url: '/api/User/auth',
       method: 'POST',
       body: {
        login: data.login,
        password: data.password,
      },
})
}),
  });
  
  // Export hooks for favorites endpoints
  export const {
    useGetFavoritesQuery,
    useSetToFavoritesMutation,
    useRemoveFromFavoritesMutation,
  } = api.injectEndpoints({ endpoints: authEndpoints });