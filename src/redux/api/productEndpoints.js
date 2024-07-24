// productEndpoints.js
import { api } from './api';

export const productEndpoints = (builder) => ({
  getVariants: builder.mutation({
    query: (params) => ({
      url: '/api/Products/variants',
      method: 'POST',
      body: params,
    }),
  }),
  getProducts: builder.query({
    query: (id) => `api/Products/item?id=${id}`,
    staleTime: 60000,
  }),
  getCategoryTree: builder.query({
    query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
    staleTime: 60000,
  }),
  getProductsByCategory: builder.query({
    query: (params) => {
      const { categoryId, page } = params;
      return `api/Products/variants?page=${
        page || ''
      }&category_id=${categoryId}`;
    },
    staleTime: 60000,
  }),
  getFiltersOfProducts: builder.query({
    query: ({ categoryId, filterParams }) => {
      const { filterOptionsWithPage } = filterParams;
      const getStringifiedFilters = (filters) => {
        return filters?.length > 0 ? `["${filters.join('","')}"]` : '';
      };
      const sendParams = {
        category_id: categoryId || '',
        brands: getStringifiedFilters(filterOptionsWithPage?.brands),
        tags: getStringifiedFilters(filterOptionsWithPage?.tags),
        min_price: filterOptionsWithPage?.min_price || '',
        max_price: filterOptionsWithPage?.max_price || '',
      };
      const params = new URLSearchParams({
        category_id: categoryId || '',
        ...sendParams,
      }).toString();
      console.log('filterOptionsWithPage', filterOptionsWithPage);
      return `api/Products/filters/?${params}`;
    },
    staleTime: 60000,
  }),
  getMainPageData: builder.query({
    query: () => `api/PageContent/get?target=landing`,
  }),
});

// Inject endpoints into the api
// const injectedEndpoints = api.injectEndpoints({ endpoints: productEndpoints });

// Export hooks for product endpoints
export const {
  useGetVariantsMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  useGetFiltersOfProductsQuery,
  useGetMainPageDataQuery,
} = api.injectEndpoints({ endpoints: productEndpoints });
