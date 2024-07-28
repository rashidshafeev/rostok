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
      const { sortOption } = filterParams;

      const getStringifiedFilters = (filters) => {
        return filters?.length > 0 ? `["${filters.join('","')}"]` : '';
      };

      const filtersParams = {};
      Object.entries(filterOptionsWithPage)
        .filter(
          ([key, values]) =>
            key !== 'brands' &&
            key !== 'tags' &&
            Array.isArray(values) &&
            values.length > 0
        )
        .forEach(([filterId, values]) => {
          filtersParams[filterId] = values;
        });

      const sendParams = {
        category_id: categoryId || '',
        orderBy: sortOption?.orderBy || '',
        sortOrder: sortOption?.sortOrder || '',
        search: filterParams.searchQuery || '',
        filters: JSON.stringify(filtersParams),
        max_price: filterOptionsWithPage?.max_price || '',
        min_price: filterOptionsWithPage?.min_price || '',
        page: filterOptionsWithPage.page || '',
        brands: getStringifiedFilters(filterOptionsWithPage?.brands),
        tags: getStringifiedFilters(filterOptionsWithPage?.tags),
      };

      // Сериализуем параметры вручную
      const params = Object.entries(sendParams)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');

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
