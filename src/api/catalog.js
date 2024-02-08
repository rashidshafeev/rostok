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

export const fetchCategoryProducts = async (category_id, filters) => {
  try {
    const brandsParam =
      filters?.brands?.length > 0 ? `["${filters?.brands.join('","')}"]` : '';
    const tagsParam =
      filters?.tags?.length > 0 ? `["${filters?.tags.join('","')}"]` : '';
    const body = new URLSearchParams({
      category_id: category_id,
      brands: brandsParam || '',
      max_price: filters?.max_price || '',
      min_price: filters?.min_price || '',
      // min_raiting: !filters?.highRating ? 4 : '',
      // max_raiting: filters?.highRating ? 5 : '',
      tags: tagsParam || '',
    });

    const res = await request.get('api/Products/variants', {
      params: body,
    });

    return { success: true, data: res?.data?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryProductsBySort = async (category_id, sort) => {
  try {
    const body = new URLSearchParams({
      category_id: category_id,
      orderBy: sort?.orderBy,
      sortOrder: sort?.sortOrder,
    });

    const res = await request.get('api/Products/variants', {
      params: body,
    });

    return { success: true, data: res?.data?.data };
  } catch (error) {
    return { success: false };
  }
};
