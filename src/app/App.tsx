import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from '@/app/providers/store';
import { router } from '@/app/routing/router';
import '@/app/index.css';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

export default function initializeApp(): void {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}
