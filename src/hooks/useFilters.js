import { useDispatch, useSelector } from 'react-redux';
import { useGetFiltersMutation } from '../redux/api/productEndpoints';
import { resetFilters, setFilters, setLastChanged } from '../redux/slices/filtersSlice';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const [getFilters] = useGetFiltersMutation();

  const updateFilters = (newFilterData) => {
    dispatch(setFilters(newFilterData));
    dispatch(setLastChanged(newFilterData.last_changed));

    // getFilters(newFilterData).then((response) => {
    //   if (response.data) {
    //     dispatch(setFilters(response.data.basics));
    //   }
    // });
  };

  const resetAllFilters = () => {
    dispatch(resetFilters());
    // Add logic to reset filters on the server
    getFilters({ reset: true }).then((response) => {
      if (response.data) {
        dispatch(setFilters(response.data.basics));
      }
    });
  };

  return {
    filters,
    updateFilters,
    resetAllFilters,
  };
};