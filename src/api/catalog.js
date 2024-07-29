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

    const filtersParams = {};

    Object.entries(filters)
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

    Object.entries(allFilters)
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

    const queryParams = {
      category_id: searchParam ? '' : category_id,
      orderBy: sortOption?.orderBy || '',
      sortOrder: sortOption?.sortOrder || '',
      search: searchQuery,
      filters: JSON.stringify(filtersParams),
      max_price: filters?.max_price || '',
      min_price: filters?.min_price || '',
      page: filters.page || '',
      brands: getStringifiedFilters(filters?.brands),
      tags: searchParam
        ? getStringifiedFilters([searchParam])
        : getStringifiedFilters(filters?.tags),
    };

    if (window.innerWidth < 768 && filtersMobile) {
      queryParams.tags = getStringifiedFilters(filtersMobile?.tags || []);
      queryParams.brands = getStringifiedFilters(filtersMobile?.brands || []);
      queryParams.min_price = filtersMobile?.min_price || '';
      queryParams.max_price = filtersMobile?.max_price || '';
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
