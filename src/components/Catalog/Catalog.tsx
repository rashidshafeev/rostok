import Advantages from "@/components/Home/Advantages";
import Brands from "@/components/Home/Brands";
import Promotions from "@/components/Home/Promotions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CatalogContent from "./CatalogContent/CatalogContent";
import CatalogSidebar from "./CatalogSidebar/CatalogSidebar";
import React, { useEffect, useRef, useState } from "react";
import { scrollToTop } from '@/shared/lib/scrollToTop';
import {
  useGetCategoryTreeQuery,
  useGetFiltersMutation,
  useGetVariantsMutation,
} from "@/redux/api/productEndpoints";
import AllFiltersModal from "@/features/modals/ui/modals/AllFiltersModal/AllFiltersModal";
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import { FiltersState } from "@/types/Filters/FiltersState";

const CatProducts = () => {

  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const { categoryId } = useParams();

  const navigate = useNavigate();
  // const previousCategoryId = useRef(categoryId);

  const {
    data: categoryTree,
    isSuccess: categoryTreeIsSuccess,
    isError: categoryTreeIsError,
    isLoading: categoryTreeIsLoading,
  } = useGetCategoryTreeQuery(categoryId);

 
  //Filters logic

  const [filters, setFilters] = useState<FiltersState>({
    basics: {
      price: {
        min: 0,
        max: 0,
      },
      tags: [],
      brands: [],
      rating: [],
    },
    dynamics: [],
    more: [],
    category_chain: [],
  });
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filtersBlock, setFiltersBlock] = useState(false);
  const [trigger, setTrigger] = useState(""); // Нужно в основном для фильтра цен, чтобы он не отсылал запрос при инициализации, и при смене категорий устанавливал правильные значения
  const previousFilters = useRef({});

  const [
    getFilters,
    // { isLoading: filtersIsLoading,
    //   isSuccess: filtersIsSuccess },
  ] = useGetFiltersMutation();

  const getNewFiltersList = async (sendObject, trigger) => {
    if (trigger === "categoryId" || trigger === "tags" || trigger === "brands") {
      setFiltersLoading(true);
    } else if (trigger === "filters") {
      setFiltersBlock(true);
    }

    const newFilters = await getFilters(sendObject);
    
    // Type guard to check if response has data
    if ('data' in newFilters) {
      const more = newFilters.data.more.map(obj => ({
        ...obj,
        additional_filter: true
      }));
      
      const newDynamics = newFilters.data.dynamics.concat(more);

      const newFiltersState = {
        ...filters,
        basics: newFilters.data.basics,
        dynamics: newDynamics,
      };

      navigate(`?${buildQueryParams(getSendFiltersObject2(newFiltersState), sort, page)}`, {replace: true});

      previousFilters.current = newFiltersState;
      setFilters(newFiltersState);
      setTrigger(trigger);

      // Reset loading states
      if (trigger === "categoryId" || trigger === "tags" || trigger === "brands") {
        setFiltersLoading(false);
      } else if (trigger === "filters") {
        setFiltersBlock(false);
      }
    } else {
      // Handle error case
      console.error('Failed to fetch filters:', newFilters.error);
      
      // Reset loading states on error
      setFiltersLoading(false);
      setFiltersBlock(false);
    }
  };


  const [
    getVariants,
    { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
  ] = useGetVariantsMutation();

  const getProducts = async (sendObject) => {
    setProductsLoading(true);

    const products = await getVariants(sendObject);
    if (products.data.success === "ok") {
      setProducts(products.data);
    }
    setProductsLoading(false);
  };


  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(previousFilters.current)) {
      getNewFiltersList(
        {
          ...getSendFiltersObject(),
          // min_raiting (float): минимальный рейтинг
          // max_raiting (float): максимальный рейтинг

          // orderBy (string): Сортировка по полю
          // sortOrder (string): Направление сортировки
        },
        "filters"
      );
      getProducts({
        ...getSendFiltersObject(),
        page: 1,
        limit: 20,
        orderBy: sort.sortBy || 'popularity',
        sortOrder: sort.sortOrder || 'desc',

        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг
      });
    }
    // scrollToTop();
  }, [filters]);

  useEffect(() => {
    const queryParams = parseQueryParams(location.search);
    
    if (categoryId === 'tags' || categoryId === 'brands') return;

    if (isFirstLoad.current && queryParams) {
      getNewFiltersList(
        { ...queryParams.filtersObject, category_id: categoryId },
        "categoryId"
      );
      setPage(queryParams.page || 1);
      getProducts({
        ...queryParams.filtersObject,
        // ...queryParams.sortObject,
        orderBy: queryParams.sortObject.sortBy || 'popularity',
        sortOrder: queryParams.sortObject.sortOrder || 'desc',
        page: queryParams.page || 1,
        limit: 20,
        category_id: categoryId,
      });
      isFirstLoad.current = false; // Mark the first load as completed
    } else {
      getNewFiltersList(
        {
          category_id: categoryId,
          min_price: null,
          max_price: null,
          brands: [],
          tags: [],
          filters: {},
          last_changed: {},
          // min_raiting (float): минимальный рейтинг
          // max_raiting (float): максимальный рейтинг

          // orderBy (string): Сортировка по полю
          // sortOrder (string): Направление сортировки
        },
        "categoryId"
      );

      getProducts({
        page: 1,
        limit: 20,
        orderBy: sort.sortBy,
        sortOrder: sort.sortOrder,
        category_id: categoryId,
        min_price: null,
        max_price: null,
        brands: [],
        tags: [],
        filters: {},
        last_changed: {},

        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг
      });

      setPage(1);

    }

    scrollToTop();
  }, [categoryId]);

  useEffect(() => {
    const queryParams = parseQueryParams(location.search);
    scrollToTop()

    if (categoryId === 'tags' && queryParams.filtersObject.tags.length > 0 && !queryParams.filtersObject.max_price) {
      getNewFiltersList({
        ...getSendFiltersObject(),
        tags: [queryParams?.filtersObject?.tags[0]?.toUpperCase()] },
        "tags"
      );

      getProducts({
        ...getSendFiltersObject(),
        tags: [queryParams?.filtersObject?.tags[0]?.toUpperCase()] ,

        page: 1,
        limit: 20,
        orderBy: sort.sortBy || 'popularity',
        sortOrder: sort.sortOrder || 'desc',

        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг
      });
      return
    }

    if (categoryId === 'brands' && queryParams.filtersObject.brands.length > 0 && !queryParams.filtersObject.max_price) {

      getNewFiltersList({
        ...getSendFiltersObject(),
        brands: [queryParams?.filtersObject?.brands[0]] },
        "brands"
      );

      getProducts({
        ...getSendFiltersObject(),
        brands: [queryParams?.filtersObject?.brands[0]]  ,

        page: 1,
        limit: 20,
        orderBy: sort.sortBy || 'popularity',
        sortOrder: sort.sortOrder || 'desc',

        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг
      });
      return
    }
  }, [location.search]);

  const isFirstLoad = useRef(true);

  // useEffect(() => {
  //   if (isFirstLoad.current) {
  //     const queryParams = parseQueryParams(location.search);
  //     if (queryParams) {
  //       setFilters(queryParams.filtersObject);
  //       setSort(queryParams.sortObject);
  //       setPage(queryParams.page);
  //     }
  //     isFirstLoad.current = false; // Mark the first load as completed
  //   }
  // }, []); // Only run once on initial load

  const resetFilters = async () => {
    getNewFiltersList(
      {
        category_id: categoryId === "tags" || categoryId === "brands" ? null : categoryId,

        min_price: null,
        max_price: null,
        brands: [],
        tags: [],
        filters: {},
        last_changed: {},
        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг

        // orderBy (string): Сортировка по полю
        // sortOrder (string): Направление сортировки
      },
      "categoryId"
    );

    getProducts({
      page: page,
      limit: 20,
      orderBy: sort.sortBy,
      sortOrder: sort.sortOrder,
      category_id: categoryId === "tags" || categoryId === "brands" ? null : categoryId,

      min_price: null,
      max_price: null,
      brands: [],
      tags: [],
      filters: {},
      last_changed: {},

      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг
    });
    scrollToTop();
  };
  // Products logic
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    sortBy: "popularity",
    sortOrder: "desc",
  });

  const sortPrevious = useRef(sort);

  const handlePagination = (e, p) => {
    setPage(p);
    // if (pagePrevious.current !== page) {
    getProducts({
      ...getSendFiltersObject(),
      page: p,
      limit: 20,
      orderBy: sort.sortBy,
      sortOrder: sort.sortOrder,

      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг
    });
    // pagePrevious.current = page;
    // }
    scrollToTop();
  };



  useEffect(() => { 
    if (JSON.stringify(sortPrevious.current) !== JSON.stringify(sort)) {
      getProducts({
        ...getSendFiltersObject(),
        page: page,
        limit: 20,
        orderBy: sort.sortBy,
        sortOrder: sort.sortOrder,

        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг
      });
    }
  }, [sort]);

  // Utility

  const getSendFiltersObject2 = (filters) => {
    
    const brands = filters?.basics?.brands?.reduce((acc, brand) => {
      if (brand.is_selected) {
        acc.push(brand.id);
      }
      return acc;
    }, []);

    const tags = filters?.basics?.tags?.reduce((acc, tag) => {
      
      console.log(tag);
      if (tag.is_selected) {
        acc.push(tag.tag);
      }
      return acc;
    }, []);

    const dynamicFilters = filters?.dynamics
      ?.filter((filter) => filter.values.some((value) => value.is_selected))
      .reduce((acc, filter) => {
        acc[filter.id] = filter.values
          .filter((value) => value.is_selected)
          .map((value) => value.id);
        return acc;
      }, {});

    return {
      category_id: categoryId === "tags" || categoryId === "brands" ? null : categoryId,

      min_price: filters?.basics?.price?.current_values?.min || null,
      max_price: filters?.basics?.price?.current_values?.max || null,
      brands: brands || [],
      tags: tags || [],
      filters: dynamicFilters || {},
      last_changed: filters?.lastChanged || {},
    };
  };

  const getSendFiltersObject = () => {
    
    const brands = filters?.basics?.brands?.reduce((acc, brand) => {
      if (brand.is_selected) {
        acc.push(brand.id);
      }
      return acc;
    }, []);

    const tags = filters?.basics?.tags?.reduce((acc, tag) => {
      
      if (tag.is_selected) {
        acc.push(tag.tag);
      }
      return acc;
    }, []);

    const dynamicFilters = filters?.dynamics
      ?.filter((filter) => filter.values.some((value) => value.is_selected))
      .reduce((acc, filter) => {
        acc[filter.id] = filter.values
          .filter((value) => value.is_selected)
          .map((value) => value.id);
        return acc;
      }, {});

    return {
      category_id: categoryId === "tags" || categoryId === "brands" ? null : categoryId,
      // category_id: categoryId,
      min_price: filters?.basics?.price?.current_values?.min || null,
      max_price: filters?.basics?.price?.current_values?.max || null,
      brands: brands || [],
      tags: tags || [],
      filters: dynamicFilters || {},
      last_changed: filters?.lastChanged || {},
    };
  };

  const parseQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    const filtersObject = {
      min_price: null,
      max_price: null,
      brands: [],
      tags: [],
      filters: {},
      last_changed: {},
    };
    const sortObject = {
      sortBy: undefined,
      sortOrder: undefined,
    };
    let page = undefined;

    // Parse min_price and max_price
    if (params.has("min_price")) {
      filtersObject.min_price =
        params.get("min_price") === "null"
          ? null
          : parseInt(params.get("min_price"), 10);
    }
    if (params.has("max_price")) {
      filtersObject.max_price =
        params.get("max_price") === "null"
          ? null
          : parseInt(params.get("max_price"), 10);
    }

    // Parse brands
    if (params.has("brands")) {
      filtersObject.brands = params.get("brands").split(",").map(Number);
    }

    // Parse tags
    if (params.has("tags")) {
      filtersObject.tags = params.get("tags").split(",");
    }

    // Parse dynamic filters (filter_*)
    params.forEach((value, key) => {
      if (key.startsWith("filter_")) {
        const filterId = key.replace("filter_", "");
        filtersObject.filters[filterId] = value.split(",").map(Number);
      }
    });

    // Parse last_changed
    if (params.has("last_changed_type")) {
      filtersObject.last_changed.type = params.get("last_changed_type");
    }
    if (params.has("last_changed_filter")) {
      filtersObject.last_changed.filter = parseInt(
        params.get("last_changed_filter"),
        10
      );
    }

    // Parse sortBy and sortOrder
    if (params.has("sort_by")) {
      sortObject.sortBy = params.get("sort_by");
    }
    if (params.has("sort_order")) {
      sortObject.sortOrder = params.get("sort_order");
    }

    // Parse page
    if (params.has("page")) {
      page = parseInt(params.get("page"), 10);
    }

    return {
      filtersObject,
      sortObject,
      page,
    };
  };

  const buildQueryParams = (filtersObject, sortObject, page) => {
    const params = new URLSearchParams();
    // Category ID
    // if (filtersObject.category_id) params.set('category_id', filtersObject.category_id);

    // Price range
    if (filtersObject.min_price !== undefined)
      params.set("min_price", filtersObject.min_price);
    if (filtersObject.max_price !== undefined)
      params.set("max_price", filtersObject.max_price);

    // Brands
    if (filtersObject.brands?.length) {
      params.set("brands", filtersObject.brands.join(","));
    }

    // Tags
    if (filtersObject.tags?.length) {
      params.set("tags", filtersObject.tags.join(","));
    }

    // Dynamic Filters
    if (
      filtersObject.filters &&
      Object.keys(filtersObject.filters).length > 0
    ) {
      for (const key in filtersObject.filters) {
        params.set(`filter_${key}`, filtersObject.filters[key].join(","));
      }
    }

    // Last Changed
    if (filtersObject.last_changed.filter !== undefined) {
      params.set("last_changed_type", filtersObject.last_changed.type);
      params.set("last_changed_filter", filtersObject.last_changed.filter);
    }

    if (sortObject.sortBy !== undefined)
      params.set("sort_by", sortObject.sortBy);
    if (sortObject.sortOrder !== undefined)
      params.set("sort_order", sortObject.sortOrder);

    if (page) params.set("page", page);

    return params.toString();
  };


  return (
    <div className="content lining-nums proportional-nums">
      <Breadcrumbs />
      <div className="flex gap-3">
      <h3 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
        {!categoryTreeIsLoading &&
          categoryTreeIsSuccess &&
          categoryTree?.category?.name}
      </h3>
      <span className="text-colDarkGray">{categoryTree?.category?.product_count} </span>
      </div>
      
      
      <div className="flex pb-10 min-h-[420px]">
      {/* <div className="md:block hidden max-w-[220px] min-w-[220px] w-full mr-5"> */}
      <div className="md:block hidden basis-1/4 mr-5">
        <CatalogSidebar
        setFiltersModalOpen={setFiltersModalOpen}
          filters={filters}
          setFilters={setFilters}
          trigger={trigger}
          setTrigger={setTrigger}
          resetFilters={resetFilters}
          filtersIsLoading={filtersLoading}
          filtersBlock={filtersBlock}
        />
        </div>
        <CatalogContent
        setFiltersModalOpen={setFiltersModalOpen}
          products={products}
          getVariantsIsLoading={productsLoading}
          page={page}
          handlePagination={handlePagination}
          sort={sort}
          setSort={setSort}
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
        trigger={trigger}
        setTrigger={setTrigger}
        resetFilters={resetFilters}
        filtersIsLoading={filtersLoading}
        filtersBlock={filtersBlock}
      />
    </div>
  );
};

export default CatProducts;
