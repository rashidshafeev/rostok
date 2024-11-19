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
    query: (id) => {
      return {
        url: '/Company/delete',
        method: 'POST',
        body: { id: id },
      };
    },
  }),
  editOrganization: builder.mutation({
    query: (data) => {
      console.log('data', data);
      return {
        url: '/Company/update',
        method: 'POST',
        body: data,
      };
    },
  }),
});

export const {
  useGetOrgSuggestionsMutation,
  useGetOrganizationsQuery,
  useAddOrganizationMutation,
  useDeleteOrganizationMutation,
  useEditOrganizationMutation,
} = api.injectEndpoints({
  endpoints: organizationEndpoints,
});
