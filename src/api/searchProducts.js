import { request } from './axios';

export const fetchSearchResults = async (searchQuery) => {
  try {
    const res = await request.get(
      `/api/Products/variants?search=${searchQuery}`
    );
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
