import { api } from './api';
import { GetTransactionListResponse } from '@/types/ServerData/GetTransactionList';
import { GetWalletInfoResponse } from '@/types/ServerData/GetWalletInfo';

export const walletEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionList: builder.query<GetTransactionListResponse, { page: number, limit?: number }>({
      query: ({ page, limit = 10 }) => ({
        url: '/api/Wallet/transaction/list',
        params: {
          page,
          limit,
        },
      }),
    }),
    getWalletInfo: builder.query<GetWalletInfoResponse, void>({
      query: () => ({
        url: '/api/Wallet/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTransactionListQuery, useGetWalletInfoQuery } = walletEndpoints;
