/* eslint-disable no-unused-vars */
import { request } from './axios';

export const fetchAllCategoryProducts = async (
  slug,
  filters,
  filtersTwo,
  allFilters,
  searchQuery
) => {
  try {
    const queryParams = {
      category_id: slug,
      brands:
        allFilters?.filterOptions?.brands?.length > 0
          ? `["${allFilters?.filterOptions?.brands.join('","')}"]`
          : '',
      tags:
        allFilters?.filterOptions?.tags?.length > 0
          ? `["${allFilters?.filterOptions?.tags.join('","')}"]`
          : '',
      max_price: allFilters?.filterOptions?.max_price || '',
      min_price: allFilters?.filterOptions?.min_price || '',
      orderBy: allFilters.sortOption ? allFilters.sortOption.orderBy : '',
      sortOrder: allFilters.sortOption ? allFilters.sortOption.sortOrder : '',
      search: searchQuery || '',
    };

    const filtersString = Object.entries(filters)
      .filter(([_, values]) => values.length > 0)
      .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
      .join(',');

    if (filtersString.length > 0) {
      queryParams.filters = `{${filtersString}}`;
    }

    if (window.innerWidth < 768 && filtersTwo) {
      if (filtersTwo.tags && filtersTwo.tags.length > 0) {
        queryParams.tags = JSON.stringify(filtersTwo.tags);
      }
      if (filtersTwo.min_price) {
        queryParams.min_price = filtersTwo.min_price;
      }
      if (filtersTwo.max_price) {
        queryParams.max_price = filtersTwo.max_price;
      }
      if (filtersTwo.brands && filtersTwo.brands.length > 0) {
        queryParams.brands = JSON.stringify(filtersTwo.brands);
      }
    }

    const res = await request.get(
      `api/Products/variants?search=${searchQuery || ''}`,
      {
        params: queryParams,
      }
    );

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryProducts = async (
  category_id,
  filters,
  sortOption,
  allFilters = {},
  filtersMobile,
  searchQuery = ''
) => {
  try {
    const getStringifiedFilters = (filters) => {
      return filters?.length > 0 ? `["${filters.join('","')}"]` : '';
    };

    const queryParams = {
      category_id,
      brands: getStringifiedFilters(filters?.brands),
      tags: getStringifiedFilters(filters?.tags),
      max_price: filters?.max_price || '',
      min_price: filters?.min_price || '',
      orderBy: sortOption?.orderBy || '',
      sortOrder: sortOption?.sortOrder || '',
      search: searchQuery,
    };

    const filtersString = Object.entries(allFilters)
      .filter(([, values]) => values.length > 0)
      .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
      .join(',');

    if (filtersString) {
      queryParams.filters = `{${filtersString}}`;
    }

    if (window.innerWidth < 768 && filtersMobile) {
      queryParams.tags = getStringifiedFilters(filtersMobile?.tags);
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
