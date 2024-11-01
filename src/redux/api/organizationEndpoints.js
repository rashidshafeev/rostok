import { api } from './api';

export const organizationEndpoints = (builder) => ({
  getOrgSuggestions: builder.mutation({
    query: (data) => ({
      url: `/api/Company/suggest?query=${data}`,
      method: 'GET',
    }),
  }),
  addOrganization: builder.mutation({
    query: (data) => ({
      url: '/api/Company/new',
      method: 'POST',
      body: data,
    }),
  }),
});

export const { useGetOrgSuggestionsMutation, useAddOrganizationMutation } =
  api.injectEndpoints({
    endpoints: organizationEndpoints,
  });
