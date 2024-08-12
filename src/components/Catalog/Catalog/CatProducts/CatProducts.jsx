import Advantages from "../../../Home/Advantages";
import Brands from "../../../Home/Brands";
import Promotions from "../../../Home/Promotions";
import { useLocation, useParams } from "react-router-dom";
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

const CatProducts = () => {
  const { categoryId } = useParams();jn,j,

  //Breadcrumbs logic

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
  const previousFilters = useRef({});
  const previousSendObject = useRef({});

  const [
    getFilters,
    { isLoading: filtersIsLoading, isSuccess: filtersIsSuccess },
  ] = useGetFiltersMutation();

  const getNewFiltersList = async () => {
    const newFilters = await getFilters({
      ...getSendFiltersObject(),
      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг

      // orderBy (string): Сортировка по полю
      // sortOrder (string): Направление сортировки
    });

    const newFiltersState = {
      ...filters,
      basics: newFilters.data.basics,
      dynamics: newFilters.data.dynamics,
    };

    if (
      newFilters.data.success === "ok" &&
      JSON.stringify(newFiltersState) !==
        JSON.stringify(previousFilters.current)
    ) {
      previousFilters.current = newFiltersState;
      setFilters(newFiltersState);
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(previousSendObject.current) !==
      JSON.stringify(getSendFiltersObject())
    ) {
      previousSendObject.current = getSendFiltersObject();
      getNewFiltersList();
    }
  }, [categoryId, filters]);

  //Products fetching logic

  const [page, setPage] = useState(1);

  const handlePagination = (e, p) => {
    setPage(p);
    scrollToTop();
  };

  const [
    getVariants,
    { isLoading: getVariantsIsLoading, isSuccess: getVariantsIsSuccess },
  ] = useGetVariantsMutation();

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await getVariants({
      page: page,
      limit: 20,
      ...getSendFiltersObject(),
      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг
      // orderBy (string): Сортировка по полю
      // sortOrder (string): Направление сортировки
    });
    if (products.data.success === "ok") {
      setProducts(products.data);
    }
  };

  useEffect(() => {
    console.log("fired");
    console.log(
      JSON.stringify(previousFilters.current) !== JSON.stringify(filters)
    );

    if (JSON.stringify(previousFilters.current) !== JSON.stringify(filters)) {
      console.log("fired2");

      getProducts();
    }
  }, [page, filters, categoryId]);

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
      min_price: filters?.basics?.price?.current_values?.min || 0,
      max_price: filters?.basics?.price?.current_values?.max || 0,
      brands: brands || [],
      tags: tags || [],
      filters: dynamicFilters || {},
      last_changed: filters?.lastChanged || {},
    };
  };

  const resetFilters = async () => {
    const newFilters = await getFilters({
      category_id: categoryId,
      page: page,
      limit: 20,
      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг

      // orderBy (string): Сортировка по полю
      // sortOrder (string): Направление сортировки
    });

    const newFiltersState = {
      basics: newFilters.data.basics,
      dynamics: newFilters.data.dynamics,
    };

    if (
      newFilters.data.success === "ok" &&
      JSON.stringify(newFiltersState) !==
        JSON.stringify(previousFilters.current)
    ) {
      previousSendObject.current = {
        category_id: categoryId,
        page: page,
        limit: 20,
        // min_raiting (float): минимальный рейтинг
        // max_raiting (float): максимальный рейтинг

        // orderBy (string): Сортировка по полю
        // sortOrder (string): Направление сортировки
      };
      // previousFilters.current = newFiltersState;
      setFilters(newFiltersState);
    }
  };

  //

  useEffect(() => {
    previousSendObject.current = getSendFiltersObject();
  }, []);

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
          filtersIsLoading={filtersIsLoading}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
        <CatProdContent
          products={products}
          getVariantsIsLoading={getVariantsIsLoading}
          handlePagination={handlePagination}
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
