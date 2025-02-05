export interface ApiError {
  success: boolean;
  err: string;
  err_code: string;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' === false &&
    'err' in error &&
    'err_code' in error
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.err;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Произошла неизвестная ошибка';
};
