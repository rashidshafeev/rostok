import axios from 'axios';
import { getTokenFromCookies } from '@/features/auth/lib';

export const baseURL = 'https://rosstok.ru';

// Use only for get requests:
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getTokenFromCookies()}`,
  },
});
