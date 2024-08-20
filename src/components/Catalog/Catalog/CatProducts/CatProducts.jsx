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

  //Breadcrums logic

  const { categoryId } = useParams();
  const previousCategoryId = useRef(categoryId);

  const {
    data: categoryTree,
    isSuccess: categoryTreeIsSuccess,
    isError: categoryTreeIsError,
    isLoading: categoryTreeIsLoading,
  } = useGetCategoryTreeQuery(categoryId);
  const [breadCrumbs, setBreadCrumbs] = useState([]);

  useEffect(() => {
    setBreadCrumbs(categoryTree?.category_chain);
  }, [categoryTree]);

  //Filters logic

  const [filters, setFilters] = useState({});
  const [trigger, setTrigger] = useState(''); // Нужно в основном для фильтра цен, чтобы он не отсылал запрос при инициализации, и при смене категорий устанавливал правильные значения
  const previousFilters = useRef({});

  const [sort, setSort] = useState({
    sortBy: "popularity",
    sortOrder: "desc",
  })

  const [
    getFilters,
    { isLoading: filtersIsLoading, isSuccess: filtersIsSuccess },
  ] = useGetFiltersMutation();

  const getNewFiltersList = async (sendObject, trigger) => {
      const newFilters = await getFilters(sendObject);
  
      const newFiltersState = {
        ...filters,
        basics: newFilters.data.basics,
        dynamics: newFilters.data.dynamics,
      };


      previousFilters.current = newFiltersState;
      setFilters(newFiltersState);
      setTrigger(trigger);

    };


    useEffect(() => {
      if (JSON.stringify(filters) !== JSON.stringify(previousFilters.current)) {
        getNewFiltersList({
          ...getSendFiltersObject(),
          // min_raiting (float): минимальный рейтинг
          // max_raiting (float): максимальный рейтинг
    
          // orderBy (string): Сортировка по полю
          // sortOrder (string): Направление сортировки
        })
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
    }, [filters])
    
    useEffect(() => {
        getNewFiltersList({
          category_id: categoryId,
      min_price: null,
      max_price: null,
      brands: [],
      tags:[],
      filters: {},
      last_changed: {},
          // min_raiting (float): минимальный рейтинг
          // max_raiting (float): максимальный рейтинг
    
          // orderBy (string): Сортировка по полю
          // sortOrder (string): Направление сортировки
        }, 'categoryId')

    getProducts({
      page: page,
      limit: 20,
      orderBy: sort.sortBy,
      sortOrder: sort.sortOrder,
      category_id: categoryId,
      min_price: null,
      max_price: null,
      brands: [],
      tags:[],
      filters: {},
      last_changed: {},
      

      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг
    });

    }, [categoryId])


  const resetFilters = async () => {
    getNewFiltersList({
      category_id: categoryId,
  min_price: null,
  max_price: null,
  brands: [],
  tags:[],
  filters: {},
  last_changed: {},
      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг

      // orderBy (string): Сортировка по полю
      // sortOrder (string): Направление сортировки
    }, 'categoryId')

getProducts({
  page: page,
  limit: 20,
  orderBy: sort.sortBy,
  sortOrder: sort.sortOrder,
  category_id: categoryId,
  min_price: null,
  max_price: null,
  brands: [],
  tags:[],
  filters: {},
  last_changed: {},
  

  // min_raiting (float): минимальный рейтинг
  // max_raiting (float): максимальный рейтинг
});
  }
  // Products logic

  const [page, setPage] = useState(1);

  const handlePagination = (e, p) => {
    setPage(p);
    scrollToTop();
  };

  const pagePrevious = useRef(page);

  const [
    getVariants,
    { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
  ] = useGetVariantsMutation();

  const [products, setProducts] = useState([]);

  const getProducts = async (sendObject) => {
    const products = await getVariants(sendObject);
    if (products.data.success === "ok") {
      setProducts(products.data);
    }
  };

  useEffect(() => {
    if (pagePrevious.current != page) {
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
    
  }, [page, sort]);

  // Utility 

  const getSendFiltersObject = () => {
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
      category_id: categoryId,
      min_price: filters?.basics?.price?.current_values?.min || null,
      max_price: filters?.basics?.price?.current_values?.max || null,
      brands: brands || [],
      tags: tags || [],
      filters: dynamicFilters || {},
      last_changed: filters?.lastChanged || {},
    };
  };

  return (
    <div className="content lining-nums proportional-nums">
      <BreadCrumbs breadCrumps={breadCrumbs} />
      <h3 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
        {!categoryTreeIsLoading &&
          categoryTreeIsSuccess &&
          categoryTree?.category?.name}
      </h3>
      <div className="flex pb-10 min-h-[420px]">
        <CatProdSidebar
          filters={filters}
          setFilters={setFilters}
          trigger={trigger}
          setTrigger={setTrigger}
          filtersIsLoading={filtersIsLoading}
          resetFilters={resetFilters}
        />
        <CatProdContent
          products={products}
          getVariantsIsLoading={getVariantsIsLoading}
          handlePagination={handlePagination}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
      {/* <AllFiltersModal
        open={open}
        setOpen={setOpen}
        category={id}
        setCatProducts={setCatProducts}
        allFilters={filters}
        setFilters={setFilters}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      /> */}
    </div>
  );

};



export default CatProducts;
