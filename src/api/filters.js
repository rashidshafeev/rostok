import {
  fetchFiltersFailure,
  fetchFiltersStart,
  fetchFiltersSuccess,
} from '../redux/slices/filtersSlice';
import { request } from './axios';

export const fetchFilters = async (dispatch, category_id) => {
  dispatch(fetchFiltersStart());
  try {
    const res = await request.get(
      `api/Products/filters/?category_id=${category_id}`
    );
    dispatch(fetchFiltersSuccess(res?.data));
  } catch (error) {
    dispatch(fetchFiltersFailure(error));
  }
};
