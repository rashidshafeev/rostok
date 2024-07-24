import axios from 'axios';
import { getTokenFromCookies } from '../helpers/cookies/cookies';
export const baseURL = 'https://bot-adash.host2bot.ru';

// Use only for get requests:
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getTokenFromCookies()}`,
  },
});
