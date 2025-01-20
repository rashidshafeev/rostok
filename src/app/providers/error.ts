import { isRejectedWithValue } from '@reduxjs/toolkit';

import type { RootState } from './store';
import type { Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorMiddleware: Middleware<{}, RootState> =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      // Handle API errors
      console.error('API Error:', action.payload);
      // You could dispatch notifications here or handle errors in other ways
    }

    return next(action);
  };
