import {
  fetchFiltersFailure,
  fetchFiltersStart,
  fetchFiltersSuccess,
} from '../redux/slices/filtersSlice';
import { request } from './axios';

export const fetchFilters = async (dispatch) => {
  dispatch(fetchFiltersStart());
  try {
    const res = await request.get('api/Products/filters');
    dispatch(fetchFiltersSuccess(res?.data));
  } catch (error) {
    dispatch(fetchFiltersFailure(error));
  }
};
