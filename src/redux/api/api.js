// // src/redux/api/api.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import Cookies from 'js-cookie';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://bot-adash.host2bot.ru/',
//     prepareHeaders: ( headers, { getState } ) => {
//       // const token = Cookies.get('token');
//       const token = getState().user.token
//       console.log('Query fired')
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//     credentials: 'include',
//   }),
//   tagTypes: ['Favorite', 'Order', 'Comparison', 'User'],
//   endpoints: () => ({}), // Initially empty, endpoints will be injected later
// });

// src/redux/api/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://bot-adash.host2bot.ru/',
  prepareHeaders: (headers, { getState }) => {
    // const token = Cookies.get('token');
    const token = getState().user.token;
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
  tagTypes: ['Favorite', 'Order', 'Comparison', 'User'],
  endpoints: () => ({}), // Initially empty, endpoints will be injected later
});