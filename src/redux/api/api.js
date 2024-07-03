// src/redux/api/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bot-adash.host2bot.ru/',
    prepareHeaders: ( headers, { getState } ) => {
      // const token = Cookies.get('token');
      const token = getState().user.token
      console.log("getststa")
      console.log(getState().user)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log("token")
      console.log(token)
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Favorite', 'Order'],
  endpoints: () => ({}), // Initially empty, endpoints will be injected later
});