import {
  fetchCatalogFailure,
  fetchCatalogStart,
  fetchCatalogSuccess,
} from '../redux/slices/catalogSlice';
import { request } from './axios';

export const fetchCatalogOfProducts = async (dispatch) => {
  dispatch(fetchCatalogStart());
  try {
    const res = await request.get('api/Products/categoryTree');
    dispatch(fetchCatalogSuccess(res?.data));
  } catch (error) {
    dispatch(fetchCatalogFailure(error));
  }
};

export const fetchProductsByCategory = async () => {
  try {
    const body = new URLSearchParams({
      parent_category: 6,
      page: 1,
    });

    const res = await request.get('api/Products/variantsByCategory', {
      params: body,
    });
    return { success: true, data: res?.data?.data };
  } catch (error) {
    return { success: false };
  }
};
