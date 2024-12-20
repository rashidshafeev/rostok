import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { CatalogQueryParamsUtil } from '@/utils/queryParams/CatalogQueryParams';
import { useEffect } from 'react';
import { 
  useGetFiltersMutation, 
  useGetVariantsMutation 
} from '@/redux/api/productEndpoints';
import { 
  selectCatalogState, 
  selectCurrentCategoryId,
  selectFilters,
  selectSorting,
  selectPagination
} from './selectors';
import { setSorting, setFilters, setPage, setCategoryId } from './catalogSlice';
import { SortingParams } from '@/types/ServerData/Catalog';
import { FiltersState } from '@/types/Filters/FiltersState';

export const useCatalogOperations = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const catalogState = useAppSelector(selectCatalogState);
  const currentCategoryId = useAppSelector(selectCurrentCategoryId);
  const currentFilters = useAppSelector(selectFilters);
  const currentSorting = useAppSelector(selectSorting);
  const currentPagination = useAppSelector(selectPagination);

  const [getFilters] = useGetFiltersMutation();
  const [getVariants] = useGetVariantsMutation();

  // Sync URL with state
  const updateUrl = (newState = catalogState) => {
    const queryParams = CatalogQueryParamsUtil.buildQueryParams({
      ...newState.filters,
      ...newState.sorting,
      ...newState.pagination,
      category_id: newState.categoryId
    });
    navigate(`?${queryParams}`, { replace: true });
  };

  // Create request params
  const createRequestParams = () => ({
    ...currentFilters,
    ...currentSorting,
    ...currentPagination,
    category_id: currentCategoryId
  });

  // Fetch data
  const fetchData = async () => {
    const params = createRequestParams();
    await Promise.all([
      getFilters(params),
      getVariants(params)
    ]);
  };

  // Operations
  const updateSorting = async (sorting: SortingParams) => {
    dispatch(setSorting(sorting));
    await fetchData();
    updateUrl();
  };

  const updateFilters = async (filters: FiltersState) => {
    dispatch(setFilters(filters));
    await fetchData();
    updateUrl();
  };

  const updatePage = async (page: number) => {
    dispatch(setPage(page));
    await fetchData();
    updateUrl();
  };

  const updateCategory = async (categoryId: string | null) => {
    dispatch(setCategoryId(categoryId));
    await fetchData();
    updateUrl();
  };

  // Sync URL params on mount and URL changes
  useEffect(() => {
    const queryParams = CatalogQueryParamsUtil.parseQueryParams(location.search);
    if (queryParams) {
      dispatch(setFilters({
        basics: {
          price: queryParams.min_price !== null || queryParams.max_price !== null,
          tags: queryParams.tags,
          brands: queryParams.brands,
          rating: []
        },
        dynamics: [],
        more: []
      }));
      dispatch(setSorting({
        orderBy: queryParams.orderBy,
        sortOrder: queryParams.sortOrder
      }));
      dispatch(setPage(queryParams.page));
      
      if (queryParams.category_id !== currentCategoryId) {
        dispatch(setCategoryId(queryParams.category_id));
      }
    }
  }, [location.search]);

  return {
    updateSorting,
    updateFilters,
    updatePage,
    updateCategory,
    fetchData
  };
};
