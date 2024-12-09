// // src/redux/api/api.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '@store/store';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://rosstok.ru/',
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).user.token;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
//   credentials: 'include',
// });

// const loggingBaseQuery = async (args, api, extraOptions) => {
//   console.log('Request:', args);
//   const result = await baseQuery(args, api, extraOptions);
//   if (result.error) {
//     console.error('Response Error:', result.error);
//   } else {
//     console.log('Response Data:', result.data);
//   }
//   return result;
// };

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: loggingBaseQuery,
//   tagTypes: ['Favorite', 'Order', 'Comparison', 'User', 'Cart', 'Organization'],
//   endpoints: () => ({}), // Initially empty, endpoints will be injected later
// });

// src/redux/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';
import { toast } from 'sonner';

interface ErrorLogData {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  timestamp: string;
}

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
  const startTime = Date.now();
  
  try {
    const result = await baseQuery(args, api, extraOptions);
    
    // Log request details in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Request:', args);
      console.log('Response:', result);
    }

    // Handle errors from the API
    if (result.error) {
      const errorData: ErrorLogData = {
        message: result.error.data?.message || 'Unknown error',
        stack: new Error().stack,
        url: typeof args === 'string' ? args : args.url,
        timestamp: new Date().toISOString(),
      };

      // Log error to your API
      await baseQuery(
        {
          url: '/api/log-error',
          method: 'POST',
          body: errorData,
        },
        api,
        extraOptions
      );

      // Show toast for user
      toast.error('Произошла ошибка', {
        description: result.error.data?.message || 'Что-то пошло не так',
      });

      console.error('Response Error:', result.error);
    }

    return result;
  } catch (error) {
    // Handle unexpected errors
    const errorData: ErrorLogData = {
      message: error.message || 'Unexpected error',
      stack: error.stack,
      url: typeof args === 'string' ? args : args.url,
      timestamp: new Date().toISOString(),
    };

    // Try to log the error
    try {
      await baseQuery(
        {
          url: '/api/log-error',
          method: 'POST',
          body: errorData,
        },
        api,
        extraOptions
      );
    } catch (loggingError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error logging failed:', loggingError);
      }
    }

    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: error.message || 'Unexpected error occurred',
      },
    };
  } finally {
    const endTime = Date.now();
    if (process.env.NODE_ENV === 'development') {
      console.log(`Request took ${endTime - startTime}ms`);
    }
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: loggingBaseQuery,
  tagTypes: ['Favorite', 'Order', 'Comparison', 'User', 'Cart', 'Organization'],
  endpoints: (builder) => ({
    // Add a dedicated error logging endpoint
    logError: builder.mutation<void, ErrorLogData>({
      query: (errorData) => ({
        url: '/api/log-error',
        method: 'POST',
        body: errorData,
      }),
    }),
  }),
});

// Export the error logging endpoint
export const { useLogErrorMutation } = api;