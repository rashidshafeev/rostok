import { api } from './api';

export const organizationEndpoints = (builder) => ({
  getOrgSuggestions: builder.mutation({
    query: (data) => ({
      url: `/api/Company/suggest?query=${data}`,
      method: 'GET',
    }),
  }),
  getOrganizations: builder.query({
    query: () => '/api/Company/list',
    staleTime: 60000,
  }),
  addOrganization: builder.mutation({
    query: (data) => ({
      url: '/api/Company/new',
      method: 'POST',
      body: data,
    }),
  }),
  deleteOrganization: builder.mutation({
    query: (id) => ({
      url: `/api/Company/data/${id}`,
      method: 'POST',
    }),
  }),
});

export const {
  useGetOrgSuggestionsMutation,
  useGetOrganizationsQuery,
  useAddOrganizationMutation,
  useDeleteOrganizationMutation,
} = api.injectEndpoints({
  endpoints: organizationEndpoints,
});
