// src/features/auth/lib/errors.ts
export const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    NETWORK_ERROR: 'Network error occurred',
    USER_EXISTS: 'User already exists',
    INVALID_CODE: 'Invalid verification code',
  } as const;
  
  // In components:
  const { error } = useAuthWithEmail();
  {error && <ErrorMessage message={error} className="mt-2 text-red-500" />}