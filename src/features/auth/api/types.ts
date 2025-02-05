// src/features/auth/api/types.ts
import type { User } from '@/entities/user';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

export interface AuthResponse extends AdditionalServerResponseData {
  token: string;
  user: User;
}

export interface AuthRequest {
  login: string;
  password: string;
}
