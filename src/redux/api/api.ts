// src/redux/api/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rosstok.ru/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const loggingBaseQuery = async (args, api, extraOptions) => {
  console.log('Request:', args);
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.error('Response Error:', result.error);
  } else {
    console.log('Response Data:', result.data);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: loggingBaseQuery,
  tagTypes: ['Favorite', 'Order', 'Comparison', 'User', 'Cart', 'Organization'],
  endpoints: () => ({}), // Initially empty, endpoints will be injected later
});