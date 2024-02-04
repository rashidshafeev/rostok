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

export const fetchProductsByCategory = async (id, page) => {
  try {
    const body = new URLSearchParams({
      parent_category: id,
      page: page,
    });

    const res = await request.get('api/Products/variantsByCategory', {
      params: body,
    });
    return { success: true, data: res?.data?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryTree = async (id, page) => {
  try {
    const body = new URLSearchParams({
      category_id: id,
      page: page,
    });

    const res = await request.get('api/Products/categoryTree', {
      params: body,
    });
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryProducts = async (category_id) => {
  try {
    const body = new URLSearchParams({
      page: 1,
      category_id: category_id,
      min_price: '',
      max_price: '',
      brand: '',
      tag: '',
    });

    const res = await request.get('api/Products/variants', {
      params: body,
    });
    return { success: true, data: res?.data?.data };
  } catch (error) {
    return { success: false };
  }
};
