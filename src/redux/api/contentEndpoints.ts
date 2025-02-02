// src/redux/api/contentEndpoints.ts
import { api } from '@/shared/api/api';

import type { ContactsResponse } from '@/types/ServerData/PageContent/GetContactsResponse';
import type { FaqResponse } from '@/types/ServerData/PageContent/GetFaqResponse';
import type { GuaranteeResponse } from '@/types/ServerData/PageContent/GetGuaranteeResponse';
import type { LandingResponse } from '@/types/ServerData/PageContent/GetMainPageDataResponse';

export const contentEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<ContactsResponse, void>({
      query: () => ({
        url: 'api/PageContent/get',
        params: {
          target: 'contacts',
        },
      }),
    }),
    getGuarantee: builder.query<GuaranteeResponse, void>({
      query: () => ({
        url: 'api/PageContent/get',
        params: {
          target: 'guarantee',
        },
      }),
    }),
    getFaq: builder.query<FaqResponse, void>({
      query: () => ({
        url: 'api/PageContent/get',
        params: {
          target: 'faq',
        },
      }),
    }),
    getMainPageData: builder.query<LandingResponse, void>({
      query: () => ({
        url: 'api/PageContent/get',
        params: {
          target: 'landing',
        },
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetGuaranteeQuery,
  useGetFaqQuery,
  useGetMainPageDataQuery,
} = contentEndpoints;
