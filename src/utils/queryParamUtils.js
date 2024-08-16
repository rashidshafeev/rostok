import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

export const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const getQueryParams = () => {
      return queryString.parse(location.search);
    };
  
    const setQueryParams = (params) => {
      const newParams = { ...getQueryParams(), ...params };
      navigate({ search: queryString.stringify(newParams) });
    };
  
    const resetQueryParams = () => {
      navigate({ search: '' });
    };
  
    return {
      getQueryParams,
      setQueryParams,
      resetQueryParams,
    };
  };
