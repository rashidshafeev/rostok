import {
  fetchCatalogFailure,
  fetchCatalogStart,
  fetchCatalogSuccess,
} from '../redux/slices/catalogSlice';
import { request } from './axios';

export const fetchCatalogOfProducts = async (dispatch) => {
  dispatch(fetchCatalogStart());
  try {
    const res = await request.get('/api/Products/categoryTree');
    dispatch(fetchCatalogSuccess(res?.data));
  } catch (error) {
    dispatch(fetchCatalogFailure(error));
  }
};
