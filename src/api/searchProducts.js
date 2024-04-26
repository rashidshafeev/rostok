import { request } from './axios';

export const fetchSearchResults = async (searchQuery, filtersValue) => {
  try {
    const queryParams = {
      search: searchQuery,
      min_price: filtersValue.min_price || '',
      max_price: filtersValue.max_price || '',
      category_id: filtersValue.category_id || '',
      brands:
        filtersValue.brands && filtersValue.brands.length > 0
          ? JSON.stringify(filtersValue.brands)
          : '',
      tags:
        filtersValue.tags && filtersValue.tags.length > 0
          ? JSON.stringify(filtersValue.tags)
          : '',
    };

    const res = await request.get('/api/Products/variants', {
      params: queryParams,
    });

    return { success: true, data: res?.data?.data };
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
