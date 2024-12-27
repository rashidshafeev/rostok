// src/components/ErrorBoundary/ErrorBoundary.tsx
import type { ErrorInfo, ReactNode } from 'react';
import type React from 'react';
import { Component } from 'react';

import axios from 'axios';
import { toast } from 'sonner';
// import { errorService } from '@/services/errorService';

// src/services/errorService.ts

interface ErrorLogData {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
  additionalInfo?: Record<string, any>;
}

const instance = axios.create({
  baseURL: 'https://rosstok.ru',
  timeout: 5000,
});

export const errorService = {
  async logError(
    error: Error,
    errorInfo?: React.ErrorInfo,
    additionalInfo?: Record<string, any>
  ): Promise<void> {
    try {
      const errorData: ErrorLogData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
        additionalInfo,
      };

      await instance.post('/api/log-error', errorData);
    } catch (loggingError) {
      // Fail silently in production, log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error logging failed:', loggingError);
      }
    }
  },

  async logCustomError(
    message: string,
    additionalInfo?: Record<string, any>
  ): Promise<void> {
    const error = new Error(message);
    await this.logError(error, undefined, additionalInfo);
  },
};

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetCondition?: any;
  showToast?: boolean;
  logError?: boolean;
  additionalInfo?: Record<string, any>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Only log errors that are not API errors (those are already handled by the API layer)
    if (!(error instanceof Error && error.message.includes('err_code'))) {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
      }

      // Log to server if enabled
      if (this.props.logError !== false) {
        errorService.logError(error, errorInfo, this.props.additionalInfo);
      }

      // Call onError callback if provided
      if (this.props.onError) {
        this.props.onError(error, errorInfo);
      }

      // Show toast if enabled and not an API error (API errors are handled by the API layer)
      if (this.props.showToast !== false) {
        toast.error('Произошла ошибка', {
          description: this.getErrorMessage(error),
          duration: 5000,
        });
      }
    }
  }

  componentDidUpdate(prevProps: Props): void {
    // If children have changed and we had an error before, reset the error boundary
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.reset();
    }
  }

  getErrorMessage(error: Error): string {
    if (error instanceof TypeError) {
      return 'Произошла техническая ошибка. Попробуйте обновить страницу.';
    }
    if (error instanceof ReferenceError) {
      return 'Произошла ошибка в работе приложения. Мы уже работаем над её исправлением.';
    }
    return error.message || 'Произошла неизвестная ошибка';
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      console.log('Rendering error state', error); // Add logging

      if (typeof fallback === 'function') {
        const fallbackContent = fallback(error, this.reset);
        console.log('Fallback content:', fallbackContent); // Add logging
        return fallbackContent;
      }

      // Default fallback UI if no fallback provided
      return (
        <div className="p-4 rounded-lg border border-colGreen bg-colSuperLight">
          <h2 className="text-lg font-semibold text-colGreen mb-2">
            Что-то пошло не так
          </h2>
          <div className="text-sm text-colDarkGray mb-4">
            {this.getErrorMessage(error)}
          </div>
          {process.env.NODE_ENV === 'development' ? (
            <div className="mt-4">
              <details className="whitespace-pre-wrap font-mono text-xs text-colDarkGray">
                <summary>Детали ошибки</summary>
                <div className="mt-2 p-2 bg-white rounded">
                  <p className="mb-2">Message: {error.message}</p>
                  <p className="mb-2">Stack: {error.stack}</p>
                  <p>Component Stack: {errorInfo?.componentStack}</p>
                </div>
              </details>
            </div>
          ) : null}
          <button
            onClick={this.reset}
            className="mt-4 px-4 py-2 bg-colGreen text-white rounded hover:opacity-90 transition-opacity"
          >
            Попробовать снова
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
