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
    providesTags: (result) =>
      result
        ? [
            { type: 'Organization', id: 'LIST' },
            ...result.data.map(({ id }) => ({ type: 'Organization', id })),
          ]
        : [{ type: 'Organization', id: 'LIST' }],
  }),
  addOrganization: builder.mutation({
    query: (data) => ({
      url: '/api/Company/new',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
  }),
  deleteOrganization: builder.mutation({
    query: (id) => ({
      url: '/api/Company/delete',
      method: 'POST',
      body: { id },
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: 'Organization', id: 'LIST' },
      { type: 'Organization', id },
    ],
  }),
  editOrganization: builder.mutation({
    query: (data) => ({
      url: '/api/Company/update',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: 'Organization', id: 'LIST' },
      { type: 'Organization', id },
    ],
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
