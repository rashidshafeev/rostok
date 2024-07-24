/* eslint-disable no-unused-vars */
import { request } from './axios';

export const fetchCategoryProducts = async (
  category_id,
  filters,
  sortOption,
  allFilters = {},
  filtersMobile,
  searchParam,
  searchQuery = ''
) => {
  try {
    const getStringifiedFilters = (filters) => {
      return filters?.length > 0 ? `["${filters.join('","')}"]` : '';
    };

    const queryParams = {
      category_id: searchParam ? '' : category_id,
      brands: getStringifiedFilters(filters?.brands),
      tags: searchParam
        ? getStringifiedFilters([searchParam])
        : getStringifiedFilters(filters?.tags),
      max_price: filters?.max_price || '',
      min_price: filters?.min_price || '',
      orderBy: sortOption?.orderBy || '',
      sortOrder: sortOption?.sortOrder || '',
      search: searchQuery,
      page: filters.page || '',
    };

    const filtersString = Object.entries(allFilters)
      .filter(([, values]) => Array.isArray(values) && values.length > 0)
      .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
      .join(',');

    if (filtersString) {
      queryParams.filters = `{${filtersString}}`;
    }

    if (window.innerWidth < 768 && filtersMobile) {
      queryParams.tags = searchParam
        ? getStringifiedFilters([searchParam])
        : getStringifiedFilters(filtersMobile?.tags);
      queryParams.min_price = filtersMobile?.min_price || queryParams.min_price;
      queryParams.max_price = filtersMobile?.max_price || queryParams.max_price;
      queryParams.brands = getStringifiedFilters(filtersMobile?.brands);
    }

    const res = await request.get('api/Products/variants', {
      params: queryParams,
    });

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryProductsByTags = async (tag, page) => {
  try {
    const res = await request.get(
      `api/Products/variants/?tags=["${tag}"]&pages=${page}`
    );
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};
