import Advantages from "../../../Home/Advantages";
import Brands from "../../../Home/Brands";
import Promotions from "../../../Home/Promotions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CatProdContent from "./CatProdContent/CatProdContent";
import CatProdSidebar from "./CatProductsSidebar/CatProdSidebar";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../../../../helpers/scrollToTop/scrollToTop";
import BreadCrumbs from "../../../../helpers/BreadCrumbs/BreadCrumbs";
import AllFiltersModal from "../../../../helpers/CModal/AllFiltersModal";
import {
  useGetCategoryTreeQuery,
  useGetFiltersMutation,
  useGetVariantsMutation,
} from "../../../../redux/api/productEndpoints";
import { useQueryParams } from "../../../../utils/queryParamUtils";

const CatProducts = () => {

//   const { categoryId } = useParams();
//  const location = useLocation();
//  const navigate = useNavigate();
  
//   const previousCategoryId = useRef(categoryId);

//   useEffect(() => {
//     const parsedFilters = parseQueryParams(location.search);

//     getNewFiltersList(parsedFilters)
//   }, [location.search]);

//   //Breadcrumbs logic

//   const {
//     data: categoryTree,
//     isSuccess: categoryTreeIsSuccess,
//     isError: categoryTreeIsError,
//     isLoading: categoryTreeIsLoading,
//   } = useGetCategoryTreeQuery(categoryId);
//   const [breadCrumbs, setBreadCrumbs] = useState([]);

//   useEffect(() => {
//     setBreadCrumbs(categoryTree?.category_chain);
//   }, [categoryTree]);

//   //Filters logic

//   const [filters, setFilters] = useState({});
//   const previousFilters = useRef({});
//   const previousSendObject = useRef({});

//   const [
//     getFilters,
//     { isLoading: filtersIsLoading, isSuccess: filtersIsSuccess },
//   ] = useGetFiltersMutation();

//   const getNewFiltersList = async (sendObject) => {
//     const newFilters = await getFilters({
//       ...sendObject,
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг

//       // orderBy (string): Сортировка по полю
//       // sortOrder (string): Направление сортировки
//     });

//     const newFiltersState = {
//       ...filters,
//       basics: newFilters.data.basics,
//       dynamics: newFilters.data.dynamics,
//     };

//     if (
//       newFilters.data.success === "ok" &&
//       JSON.stringify(newFiltersState) !==
//         JSON.stringify(previousFilters.current)
//     ) {
//       previousFilters.current = newFiltersState;
//       setFilters(newFiltersState);
//     }
//   };

//   // useEffect(() => {
//   //   if (
//   //     JSON.stringify(previousSendObject.current) !==
//   //     JSON.stringify(getSendFiltersObject())
//   //   ) {
//   //     previousSendObject.current = getSendFiltersObject();
//   //     getNewFiltersList();
//   //     const queryParams = buildQueryParams(getSendFiltersObject());
//   //     navigate(`?${queryParams}`);
//   //   }
//   // }, [categoryId, filters]);

//   //Products fetching logic

//   const [page, setPage] = useState(1);

//   const handlePagination = (e, p) => {
//     setPage(p);
//     scrollToTop();
//   };

//   const [
//     getVariants,
//     { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
//   ] = useGetVariantsMutation();

//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     const products = await getVariants({
//       page: page,
//       limit: 20,
//       ...getSendFiltersObject(),
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг
//       // orderBy (string): Сортировка по полю
//       // sortOrder (string): Направление сортировки
//     });
//     if (products.data.success === "ok") {
//       setProducts(products.data);
//     }
//   };

//   useEffect(() => {
//     console.log("fired");
//     console.log("previousFilters.current");
//     console.log(previousFilters.current);
//     console.log("filters");
//     console.log(filters);
//     console.log(
//       JSON.stringify(previousFilters.current) !== JSON.stringify(filters)
//     );
//     console.log("previousCategoryId");
//     console.log(previousCategoryId);
//     console.log("categoryId");
//     console.log(categoryId);


//     if ((JSON.stringify(previousFilters.current) !== JSON.stringify(filters)) || (previousCategoryId.current !== categoryId)) {
//       console.log("fired2");

//       getProducts();
//     }
//   }, [page, filters, categoryId]);
  
//   // Utility

//   const getSendFiltersObject = () => {
//     const brands = filters?.basics?.brands?.reduce((acc, brand) => {
//       if (brand.is_selected) {
//         acc.push(brand.id);
//       }
//       return acc;
//     }, []);

//     const tags = filters?.basics?.tags?.reduce((acc, tag) => {
//       console.log(tag);
//       if (tag.is_selected) {
//         acc.push(tag.tag);
//       }
//       return acc;
//     }, []);

//     const dynamicFilters = filters?.dynamics
//       ?.filter((filter) => filter.values.some((value) => value.is_selected))
//       .reduce((acc, filter) => {
//         acc[filter.id] = filter.values
//           .filter((value) => value.is_selected)
//           .map((value) => value.id);
//         return acc;
//       }, {});

//     return {
//       category_id: categoryId,
//       min_price: filters?.basics?.price?.current_values?.min || 0,
//       max_price: filters?.basics?.price?.current_values?.max || 0,
//       brands: brands || [],
//       tags: tags || [],
//       filters: dynamicFilters || {},
//       last_changed: filters?.lastChanged || {},
//     };
//   };

//   const buildQueryParams = (filtersObject) => {
//     const params = new URLSearchParams();
  
//     // Pagination
//   if (filtersObject.page !== undefined) params.set('page', filtersObject.page);
//   if (filtersObject.limit !== undefined) params.set('limit', filtersObject.limit);

//   // Price range
//   if (filtersObject.min_price !== undefined) params.set('min_price', filtersObject.min_price);
//   if (filtersObject.max_price !== undefined) params.set('max_price', filtersObject.max_price);

//   // Brands
//   if (filtersObject.brands?.length) {
//     params.set('brands', filtersObject.brands.join(','));
//   }

//   // Tags
//   if (filtersObject.tags?.length) {
//     params.set('tags', filtersObject.tags.join(','));
//   }

//   // Dynamic Filters
//   if (filtersObject.filters && Object.keys(filtersObject.filters).length > 0) {
//     for (const key in filtersObject.filters) {
//       params.set(`filter_${key}`, filtersObject.filters[key].join(','));
//     }
//   }

//   // Last Changed
//   if (filtersObject.last_changed) {
//     params.set('last_changed_type', filtersObject.last_changed.type);
//     params.set('last_changed_filter', filtersObject.last_changed.filter);
//   }

//   return params.toString();
//   };

//    const parseQueryParams = (search) => {
//     const params = new URLSearchParams(search);
//     const filtersObject = {};
  
//     // Pagination
//   filtersObject.page = parseInt(params.get('page'), 10) || 1;
//   filtersObject.limit = parseInt(params.get('limit'), 10) || 20;

//   // Price range
//   filtersObject.min_price = parseFloat(params.get('min_price')) || 0;
//   filtersObject.max_price = parseFloat(params.get('max_price')) || 0;

//   // Brands
//   const brands = params.get('brands');
//   filtersObject.brands = brands ? brands.split(',') : [];

//   // Tags
//   const tags = params.get('tags');
//   filtersObject.tags = tags ? tags.split(',') : [];

//   // Dynamic Filters
//   filtersObject.filters = {};
//   params.forEach((value, key) => {
//     if (key.startsWith('filter_')) {
//       const filterId = key.replace('filter_', '');
//       filtersObject.filters[filterId] = value.split(',');
//     }
//   });

//   // Last Changed
//   filtersObject.last_changed = {
//     type: params.get('last_changed_type') || '',
//     filter: params.get('last_changed_filter') || '',
//   };

//   return filtersObject;
//   };

//   const resetFilters = async () => {
//     const newFilters = await getFilters({
//       category_id: categoryId,
//       page: page,
//       limit: 20,
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг

//       // orderBy (string): Сортировка по полю
//       // sortOrder (string): Направление сортировки
//     });

//     const newFiltersState = {
//       basics: newFilters.data.basics,
//       dynamics: newFilters.data.dynamics,
//     };

//     if (
//       newFilters.data.success === "ok" &&
//       JSON.stringify(newFiltersState) !==
//         JSON.stringify(previousFilters.current)
//     ) {
//       previousSendObject.current = {
//         category_id: categoryId,
//         page: page,
//         limit: 20,
//         // min_raiting (float): минимальный рейтинг
//         // max_raiting (float): максимальный рейтинг

//         // orderBy (string): Сортировка по полю
//         // sortOrder (string): Направление сортировки
//       };
//       previousFilters.current = newFiltersState;
//       setFilters(newFiltersState);
//     }
//   };
//   console.log( parseQueryParams(buildQueryParams(getSendFiltersObject())));

//   //

//   useEffect(() => {
//     previousSendObject.current = getSendFiltersObject();
//   }, []);

//   return (
//     <div className="content lining-nums proportional-nums">
//       <BreadCrumbs breadCrumps={breadCrumbs} />
//       <h3 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
//         {!categoryTreeIsLoading &&
//           categoryTreeIsSuccess &&
//           categoryTree?.category?.name}
//       </h3>
//       <div className="flex pb-10 min-h-[420px]">
//         <CatProdSidebar
//           filters={filters}
//           filtersIsLoading={filtersIsLoading}
//           setFilters={setFilters}
//           resetFilters={resetFilters}
//         />
//         <CatProdContent
//           products={products}
//           getVariantsIsLoading={getVariantsIsLoading}
//           handlePagination={handlePagination}
//         />
//       </div>
//       <Promotions />
//       <Brands />
//       <Advantages />
//       {/* <AllFiltersModal
//         open={open}
//         setOpen={setOpen}
//         category={id}
//         setCatProducts={setCatProducts}
//         allFilters={filters}
//         setFilters={setFilters}
//         filterParams={filterParams}
//         setFilterParams={setFilterParams}
//       /> */}
//     </div>
//   );
// };

// export default CatProducts;


// const CatProducts = () => {

//   const { categoryId } = useParams();
  
//   const previousCategoryId = useRef(categoryId);

//   //Breadcrumbs logic

//   const {
//     data: categoryTree,
//     isSuccess: categoryTreeIsSuccess,
//     isError: categoryTreeIsError,
//     isLoading: categoryTreeIsLoading,
//   } = useGetCategoryTreeQuery(categoryId);
//   const [breadCrumbs, setBreadCrumbs] = useState([]);

//   useEffect(() => {
//     setBreadCrumbs(categoryTree?.category_chain);
//   }, [categoryTree]);

//   //Filters logic

//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState({
//     sortBy: "popularity",
//     sortOrder: "desc",
//   })

//   const previousFilters = useRef({});
//   const resetState = useRef({});
//   const previousSendObject = useRef({});
//   const previousSort = useRef(sort);

//   const [
//     getFilters,
//     { isLoading: filtersIsLoading, isSuccess: filtersIsSuccess },
//   ] = useGetFiltersMutation();

//   const getNewFiltersList = async () => {
//     const newFilters = await getFilters({
//       ...getSendFiltersObject(),
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг

//       // orderBy (string): Сортировка по полю
//       // sortOrder (string): Направление сортировки
//     });

//     const newFiltersState = {
//       ...filters,
//       basics: newFilters.data.basics,
//       dynamics: newFilters.data.dynamics,
//     };

//     if (
//       newFilters.data.success === "ok" &&
//       JSON.stringify(newFiltersState) !==
//         JSON.stringify(previousFilters.current)
//     ) {
//       previousFilters.current = newFiltersState;
//       setFilters(newFiltersState);
//     }
//   };

//   useEffect(() => {
//     if (
//       JSON.stringify(previousSendObject.current) !==
//       JSON.stringify(getSendFiltersObject())
//     ) {
//       previousSendObject.current = getSendFiltersObject();
//       getNewFiltersList();
//     }
//   }, [categoryId, filters]);

//   //Products fetching logic

//   const [page, setPage] = useState(1);

//   const handlePagination = (e, p) => {
//     setPage(p);
//     scrollToTop();
//   };

//   const [
//     getVariants,
//     { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
//   ] = useGetVariantsMutation();

//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     const products = await getVariants({
//       page: page,
//       limit: 20,
//       orderBy: sort.sortBy,
//       sortOrder: sort.sortOrder,
//       ...getSendFiltersObject(),
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг
//     });
//     if (products.data.success === "ok") {
//       setProducts(products.data);
//     }
//   };

//   useEffect(() => {
//     if ((JSON.stringify(previousFilters.current) !== JSON.stringify(filters)) || (previousCategoryId.current !== categoryId) || (JSON.stringify(previousSort.current) !== JSON.stringify(sort))) {
//       console.log("fired2");

//       getProducts();
//     }
//   }, [page, filters, categoryId, sort]);
  
//   // Utility

//   const getSendFiltersObject = () => {
//     const brands = filters?.basics?.brands?.reduce((acc, brand) => {
//       if (brand.is_selected) {
//         acc.push(brand.id);
//       }
//       return acc;
//     }, []);

//     const tags = filters?.basics?.tags?.reduce((acc, tag) => {
//       console.log(tag);
//       if (tag.is_selected) {
//         acc.push(tag.tag);
//       }
//       return acc;
//     }, []);

//     const dynamicFilters = filters?.dynamics
//       ?.filter((filter) => filter.values.some((value) => value.is_selected))
//       .reduce((acc, filter) => {
//         acc[filter.id] = filter.values
//           .filter((value) => value.is_selected)
//           .map((value) => value.id);
//         return acc;
//       }, {});

//     return {
//       category_id: categoryId,
//       min_price: filters?.basics?.price?.current_values?.min || 0,
//       max_price: filters?.basics?.price?.current_values?.max || 0,
//       brands: brands || [],
//       tags: tags || [],
//       filters: dynamicFilters || {},
//       last_changed: filters?.lastChanged || {},
//     };
//   };

//   const resetFilters = async () => {
//     const newFilters = await getFilters({
//       category_id: categoryId,
//       page: page,
//       limit: 20,
//       orderBy: sort.sortBy,
//       sortOrder: sort.sortOrder,
//       max_price: filters?.basics?.price?.max || 0,
//       min_price: filters?.basics?.price?.min || 0,
//       // min_raiting (float): минимальный рейтинг
//       // max_raiting (float): максимальный рейтинг
//     });

//     const newFiltersState = {
//       basics: newFilters.data.basics,
//       dynamics: newFilters.data.dynamics,
//     };

//     if (
//       newFilters.data.success === "ok" &&
//       JSON.stringify(newFiltersState) !==
//         JSON.stringify(previousFilters.current)
//     ) {
//       previousSendObject.current = {
//         category_id: categoryId,
//         page: page,
//         limit: 20,
//         // min_raiting (float): минимальный рейтинг
//         // max_raiting (float): максимальный рейтинг

//         // orderBy (string): Сортировка по полю
//         // sortOrder (string): Направление сортировки
//       };
//       previousFilters.current = newFiltersState;
//       setFilters(newFiltersState);
//     }
//   };

//   //
//   useEffect(() => {
//     previousSendObject.current = getSendFiltersObject();
//   }, []);

//   return (
//     <div className="content lining-nums proportional-nums">
//       <BreadCrumbs breadCrumps={breadCrumbs} />
//       <h3 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
//         {!categoryTreeIsLoading &&
//           categoryTreeIsSuccess &&
//           categoryTree?.category?.name}
//       </h3>
//       <div className="flex pb-10 min-h-[420px]">
//         <CatProdSidebar
//           filters={filters}
//           setFilters={setFilters}
//           filtersIsLoading={filtersIsLoading}
//           resetFilters={resetFilters}
//         />
//         <CatProdContent
//           products={products}
//           getVariantsIsLoading={getVariantsIsLoading}
//           handlePagination={handlePagination}
//           sort={sort}
//           setSort={setSort}
//         />
//       </div>
//       <Promotions />
//       <Brands />
//       <Advantages />
//       {/* <AllFiltersModal
//         open={open}
//         setOpen={setOpen}
//         category={id}
//         setCatProducts={setCatProducts}
//         allFilters={filters}
//         setFilters={setFilters}
//         filterParams={filterParams}
//         setFilterParams={setFilterParams}
//       /> */}
//     </div>
//   );
const location = useLocation();
  const { getQueryParams } = useQueryParams();

  const queryParams = getQueryParams();

  // Example of how you might fetch filters dynamically, adjust as necessary
  const filtersData = {
    basics: {
      price: {
        min: 0,
        max: 300,
        current_values: {
          min: queryParams.min_price || 0,
          max: queryParams.max_price || 300,
        },
      },
      tags: [], // populate based on API response
      brands: [], // populate based on API response
    },
    dynamics: [], // populate based on API response
  };
  return (
    <div>
      <CatProdSidebar basics={filtersData.basics} dynamics={filtersData.dynamics} />
      <CatProdContent />
    </div>
  );

};



export default CatProducts;
