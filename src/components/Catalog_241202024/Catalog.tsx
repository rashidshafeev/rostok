import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import AllFiltersModal from '@helpers/CModal/AllFiltersModal/AllFiltersModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CatalogQueryParamsUtil } from '@/features/filters/lib';
import {
  useGetCategoryTreeQuery,
  useGetFiltersMutation,
  useGetVariantsMutation,
} from '@/entities/product/api/productApi';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import {
  OrderBy,
  SortOrder,
  PaginationParams,
} from '@/types/ServerData/Catalog';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import Advantages from '@components/Home/Advantages';
import Brands from '@components/Home/Brands';
import Promotions from '@components/Home/Promotions';

import CatalogCategoryName from './CatalogCategoryName';
import CatalogContent from './CatalogContent/CatalogContent';
import CatalogSidebar from './CatalogSidebar/CatalogSidebar';

import type { Product } from '@/entities/product/Product';
import type { FiltersState } from '@/entities/filter/Filters/FiltersState';
import type {
  GetVariantsRequest,
  GetFiltersRequest,
  SortingParams,
  BaseFilterParams,
} from '@/types/ServerData/Catalog';

const CatProducts = () => {
  // ===== State Management =====
  const [filters, setFilters] = useState<FiltersStateWithMeta>({
    page: 1,
    sort: {
      orderBy: OrderBy.popularity,
      sortOrder: SortOrder.desc,
    },
    basics: {
      price: false,
      tags: [],
      brands: [],
      rating: [],
    },
    dynamics: [],
    more: [],
  });

  // Loading and UI states
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filtersBlock, setFiltersBlock] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Refs for tracking changes
  const previousFilters = useRef<FiltersStateWithMeta>(filters);
  const isCategoryChange = useRef(false);

  // Router hooks
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // API queries
  const {
    data: categoryTree,
    isSuccess: categoryTreeIsSuccess,
    isError: categoryTreeIsError,
    isLoading: categoryTreeIsLoading,
  } = useGetCategoryTreeQuery(categoryId);

  const [getFilters] = useGetFiltersMutation();
  const [
    getVariants,
    { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
  ] = useGetVariantsMutation();

  // ===== Filters Logic =====

  /**
   * Updates filters when category changes:
   * - Resets all filters except sorting
   * - Preserves current sorting state
   */
  const updateFiltersFromCategory = async (
    request: GetFiltersRequest
  ): Promise<void> => {
    isCategoryChange.current = true;
    setFiltersLoading(true);

    // Store current sort before resetting filters
    const currentSort = filters.sort;

    // Reset filters but keep the sort
    setFilters((prev) => ({
      ...prev,
      page: 1,
      sort: currentSort,
      basics: {
        price: false,
        tags: [],
        brands: [],
        rating: [],
      },
      dynamics: [],
      more: [],
    }));

    try {
      const newFilters = await getFilters({
        ...request,
        orderBy: currentSort.orderBy,
        sortOrder: currentSort.sortOrder,
      });

      const processedFilters = processNewFilters(newFilters);

      // Update filters state with preserved sort
      updateFiltersState({
        ...processedFilters,
        sort: currentSort,
      });

      // Update URL with the current sort
      const updatedRequest = createRequest(
        getFiltersRequest({ ...processedFilters, sort: currentSort }),
        1,
        currentSort
      );
      navigate(`?${CatalogQueryParamsUtil.buildQueryParams(updatedRequest)}`, {
        replace: true,
      });
    } catch (error) {
      console.error('Error updating filters:', error);
    } finally {
      setFiltersLoading(false);
    }
  };

  /**
   * Updates filters based on user input (filter selections)
   */
  const updateFiltersFromUserInput = async (
    request: GetFiltersRequest
  ): Promise<void> => {
    setFiltersBlock(true);
    const newFilters = await getFilters(request);
    updateFiltersState(processNewFilters(newFilters));
    setFiltersBlock(false);
  };

  /**
   * Processes new filters data from API response
   */
  const processNewFilters = (newFilters: {
    data: FiltersState;
  }): FiltersState => ({
    basics: newFilters.data.basics,
    dynamics: newFilters.data.dynamics.concat(
      newFilters.data.more.map((obj) => ({ ...obj, additional_filter: true }))
    ),
    more: [],
  });

  /**
   * Updates filters state and URL query params
   */
  const updateFiltersState = (newFiltersState: FiltersState): void => {
    const request = createRequest(
      getFiltersRequest(newFiltersState),
      newFiltersState.page,
      filters.sort
    );
    navigate(`?${CatalogQueryParamsUtil.buildQueryParams(request)}`, {
      replace: true,
    });
    previousFilters.current = {
      ...previousFilters.current,
      ...newFiltersState,
    };
    setFilters((prev) => ({ ...prev, ...newFiltersState }));
  };

  // ===== Products Logic =====

  /**
   * Fetches products based on current filters and sorting
   */
  const getProducts = async (request: GetVariantsRequest): Promise<void> => {
    setProductsLoading(true);
    const products = await getVariants(request);
    if (products.data.success === 'ok') {
      setProducts(products.data);
    }
    setProductsLoading(false);
  };

  /**
   * Handles sorting changes
   */
  const handleSort = (sort: SortingParams): void => {
    const newFilters = { ...filters, sort };
    setFilters(newFilters);
    const request = createRequest(
      getFiltersRequest(newFilters),
      newFilters.page,
      sort
    );
    navigate(`?${CatalogQueryParamsUtil.buildQueryParams(request)}`, {
      replace: true,
    });
    getProducts(request);
    previousFilters.current = newFilters;
  };

  /**
   * Handles pagination changes
   */
  const handlePagination = (e: React.MouseEvent<unknown>, p: number): void => {
    const newFilters = { ...filters, page: p };
    setFilters(newFilters);
    const request = createRequest(
      getFiltersRequest(newFilters),
      p,
      filters.sort
    );
    navigate(`?${CatalogQueryParamsUtil.buildQueryParams(request)}`, {
      replace: true,
    });
    getProducts(request);
    previousFilters.current = newFilters;
    scrollToTop();
  };

  // ===== Effects =====

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(previousFilters.current)) {
      // Skip if this update was triggered by category change
      if (isCategoryChange.current) {
        isCategoryChange.current = false;
        return;
      }

      // Skip if only page changed
      const onlyPageChanged =
        filters.page !== previousFilters.current.page &&
        JSON.stringify({ ...filters, page: previousFilters.current.page }) ===
          JSON.stringify({
            ...previousFilters.current,
            page: previousFilters.current.page,
          });

      if (onlyPageChanged) {
        return;
      }

      const request = createRequest(
        getFiltersRequest(filters),
        filters.page,
        filters.sort
      );
      updateFiltersFromUserInput(request);
      getProducts(request);
      navigate(`?${CatalogQueryParamsUtil.buildQueryParams(request)}`, {
        replace: true,
      });
    }
  }, [filters]);

  useEffect(() => {
    const queryParams = CatalogQueryParamsUtil.parseQueryParams(
      location.search
    );

    // Preserve current sort if it exists, otherwise use default or query params
    const currentSort = filters.sort || {
      orderBy: queryParams?.orderBy || OrderBy.popularity,
      sortOrder: queryParams?.sortOrder || SortOrder.desc,
    };

    if (queryParams) {
      // Update filters with preserved sort
      setFilters((prev) => ({
        ...prev,
        page: queryParams.page,
        sort: currentSort,
      }));

      const request = CatalogQueryParamsUtil.createRequestFromParams(
        {
          ...queryParams,
          orderBy: currentSort.orderBy,
          sortOrder: currentSort.sortOrder,
        },
        {
          category_id: categoryId || null,
        }
      );

      updateFiltersFromCategory(request);
      getProducts(request);
    } else {
      const request = createRequest(
        {
          category_id: categoryId || null,
          search: null,
          min_price: null,
          max_price: null,
          brands: [],
          tags: [],
          filters: {},
          min_rating: null,
          max_rating: null,
        },
        1,
        currentSort
      ); // Pass the current sort explicitly

      updateFiltersFromCategory(request);
      getProducts(request);
    }

    scrollToTop();
  }, [categoryId]);

  const resetFilters = async (): Promise<void> => {
    const request = createRequest(
      {
        category_id: categoryId,
        min_price: null,
        max_price: null,
        brands: [],
        tags: [],
        filters: {},
        search: null,
        min_rating: null,
        max_rating: null,
      },
      1
    );

    updateFiltersFromCategory(request);
    getProducts(request);
    scrollToTop();
  };

  const getFiltersRequest = (
    filtersState: FiltersStateWithMeta
  ): BaseFilterParams => {
    const brands = filtersState?.basics?.brands?.reduce(
      (acc: number[], brand) => {
        if (brand.is_selected) {
          acc.push(brand.id);
        }
        return acc;
      },
      []
    );

    const tags = filtersState?.basics?.tags?.reduce((acc: string[], tag) => {
      if (tag.is_selected) {
        acc.push(tag.tag);
      }
      return acc;
    }, []);

    const dynamicFilters = filtersState?.dynamics
      ?.filter((filter) => filter.values.some((value) => value.is_selected))
      .reduce((acc: { [key: number]: number[] }, filter) => {
        acc[filter.id] = filter.values
          .filter((value) => value.is_selected)
          .map((value) => value.id);
        return acc;
      }, {});

    return {
      category_id: categoryId || null,
      search: null,
      min_price: filtersState?.basics?.price?.current_values?.min || null,
      max_price: filtersState?.basics?.price?.current_values?.max || null,
      brands: brands || [],
      tags: tags || [],
      filters: dynamicFilters || {},
      min_rating: filtersState?.basics?.rating?.[0] || null,
      max_rating: filtersState?.basics?.rating?.[1] || null,
    };
  };

  const createRequest = (
    filterParams: BaseFilterParams,
    page: number,
    sortParams?: SortingParams
  ): GetVariantsRequest & GetFiltersRequest => ({
    ...filterParams,
    page,
    // Always use provided sort params or current filters sort
    orderBy: sortParams?.orderBy || filters.sort.orderBy,
    sortOrder: sortParams?.sortOrder || filters.sort.sortOrder,
  });

  return (
    <div className="content lining-nums proportional-nums">
      <Breadcrumbs />
      <CatalogCategoryName />

      <div className="flex pb-10 min-h-[420px]">
        <div className="md:block hidden basis-1/4 mr-5">
          <CatalogSidebar
            setFiltersModalOpen={setFiltersModalOpen}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            filtersIsLoading={filtersLoading}
            filtersBlock={filtersBlock}
          />
        </div>
        <CatalogContent
          filters={filters}
          setFiltersModalOpen={setFiltersModalOpen}
          products={products}
          getVariantsIsLoading={productsLoading}
          handlePagination={handlePagination}
          handleSort={handleSort}
          sort={filters.sort}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
      <AllFiltersModal
        categoryTree={categoryTree}
        open={filtersModalOpen}
        setOpen={setFiltersModalOpen}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        filtersIsLoading={filtersLoading}
        filtersBlock={filtersBlock}
      />
    </div>
  );
};

export default CatProducts;
