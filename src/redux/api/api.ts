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

interface ApiResponse<T = any> {
  success: boolean | string;
  err?: string;
  err_code?: string;
  data?: T;
}

interface ApiErrorResponse {
  success: false;
  err: string;
  err_code: string;
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Request:', args);
      console.log('Response:', result);
    }

    // Check if response exists and has data
    if (result?.data) {
      const response = result.data as ApiResponse;
      
      // Check for API-level error (success: false)
      if (response.success === false) {
        toast.error(response.err || 'Произошла ошибка', {
          description: response.err_code ? `Код ошибки: ${response.err_code}` : undefined,
          duration: 5000
        });

        return {
          error: {
            status: 200,
            data: response
          },
        };
      }
    }

    // Handle other errors (network, etc)
    if (result.error) {
      toast.error('Произошла ошибка', {
        description: result.error.data?.message || 'Что-то пошло не так',
        duration: 5000
      });

      if (process.env.NODE_ENV === 'development') {
        console.error('Response Error:', result.error);
      }
    }

    return result;
  } catch (error) {
    toast.error('Произошла неожиданная ошибка', {
      description: error.message || 'Что-то пошло не так',
      duration: 5000
    });

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