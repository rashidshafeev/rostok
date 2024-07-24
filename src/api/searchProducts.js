import { request } from './axios';

export const fetchSearchResults = async (searchQuery, filtersValue, page) => {
  try {
    const queryParams = {
      page: page || '',
      search: searchQuery,
      min_price: filtersValue?.min_price || '',
      max_price: filtersValue?.max_price || '',
      category_id: '',
      // brands: filtersValue?.brands || '',
      // tags: filtersValue?.tags || '',
      filters: '',
    };

    const filters = {};

    Object.keys(filtersValue).forEach((key) => {
      if (Array.isArray(filtersValue[key]) && filtersValue[key].length > 0) {
        filters[key] = filtersValue[key];
      }
    });

    if (Object.keys(filters).length > 0) {
      queryParams.filters = JSON.stringify(filters);
    }

    const res = await request.get('/api/Products/variants', {
      params: queryParams,
    });

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: [] };
  }
};

export const fetchSearchFilters = async (searchQuery) => {
  try {
    const res = await request.get(
      `/api/Products/filters?search=${searchQuery}`
    );
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: [] };
  }
};
