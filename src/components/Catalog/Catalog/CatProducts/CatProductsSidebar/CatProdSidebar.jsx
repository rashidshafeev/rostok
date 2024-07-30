import { NavLink, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Loading } from "../../../../../helpers/Loader/Loader";

import {
  useGetFiltersOfProductsQuery,
} from "../../../../../redux/api/productEndpoints";
import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters";

const CatProdSidebar = ({
  setBreadCrumps,
  handleFetchByFilter,
  setOpen,
  filterParams,
}) => {
  // const { categoryId } = useParams();


  // const {
  //   data: filters,
  //   isLoading: filtersIsLoading,
  //   isSuccess: filtersIsSuccess,
  // } = useGetFiltersOfProductsQuery({
  //   categoryId,
  //   filterParams,
  // });

 
  // const [filtersState, setFiltersState] = useState({
  //   highRating: true,
  //   brands: [],
  //   tags: [],
  //   min_price: Number(filters?.basics?.price?.min),
  //   max_price: Number(filters?.basics?.price?.max),
  // });
  // const [sliderValue, setSliderValue] = useState([
  //   filtersState.min_price,
  //   filtersState.max_price,
  // ]);

  // const handleSliderChangeCommitted = () => {
  //   const [newMinPrice, newMaxPrice] = sliderValue;

  //   const updatedFilters = {
  //     ...filtersState,
  //     min_price: newMinPrice,
  //     max_price: newMaxPrice,
  //   };
  //   setFiltersState(updatedFilters);
  //   handleFetchByFilter(categoryId, updatedFilters);
  // };

  // const handleCheckboxChange = (name, value) => {
  //   const updatedFilters = {
  //     ...filtersState,
  //     [name]: filtersState[name]?.includes(value)
  //       ? filtersState[name].filter((item) => item !== value)
  //       : [...(filtersState[name] || []), value],
  //   };

  //   if (
  //     updatedFilters[name].length === 0 &&
  //     filters?.dynamics?.some((el) => el?.id === name)
  //   ) {
  //     delete updatedFilters[name];
  //   }

  //   setFiltersState(updatedFilters);
  //   handleFetchByFilter(categoryId, updatedFilters);
  // };

  // const handleChange = (name, value) => {
  //   let updatedFilters = { ...filtersState };

  //   if (name === "min_price" && parseInt(value) > filtersState.max_price) {
  //     updatedFilters = {
  //       ...updatedFilters,
  //       min_price: parseInt(value),
  //       max_price: parseInt(value),
  //     };
  //   } else if (
  //     name === "max_price" &&
  //     parseInt(value) < filtersState.min_price
  //   ) {
  //     updatedFilters = {
  //       ...updatedFilters,
  //       max_price: parseInt(value),
  //       min_price: parseInt(value),
  //     };
  //   } else {
  //     updatedFilters = {
  //       ...updatedFilters,
  //       [name]: value,
  //     };
  //   }

  //   setFiltersState(updatedFilters);
  //   handleFetchByFilter(categoryId, updatedFilters);
  // };

  // const handleClearFilters = () => {
  //   const initialFiltersState = {
  //     highRating: true,
  //     brands: [],
  //     tags: [],
  //     min_price: filters?.basics?.price?.min,
  //     max_price: filters?.basics?.price?.max,
  //   };
  //   handleFetchByFilter(categoryId, initialFiltersState);
  //   setFiltersState(initialFiltersState);
  // };

  // const toggleAccordion = (type, id) => {
  //   setAccordion((prevState) => ({
  //     ...prevState,
  //     [type]: prevState[type] === id ? null : id,
  //   }));
  // };

  // useEffect(() => {
  //   setBreadCrumps(filters?.category_chain);
  // }, [filters?.category_chain]);

  // useEffect(() => {
  //   const minPrice = filters?.basics?.price?.current_values
  //     ? filters?.basics?.price?.current_values?.min
  //     : filters?.basics?.price?.min;

  //   const maxPrice = filters?.basics?.price?.current_values
  //     ? filters?.basics?.price?.current_values?.max
  //     : filters?.basics?.price?.max;

  //   setFiltersState((prev) => ({
  //     ...prev,
  //     min_price: Number(minPrice),
  //     max_price: Number(maxPrice),
  //   }));
  //   setSliderValue([Number(minPrice), Number(maxPrice)]);
  // }, [filters?.basics?.price]);

  // const handleSliderChange = (event, newValue) => {
  //   setSliderValue(newValue);
  // };

  return (
    <div className="md:block hidden max-w-[220px] min-w-[220px] w-full mr-5">
        <SidebarCategoryTree/>
      <SidebarFilters handleFetchByFilter={handleFetchByFilter} setOpen={setOpen} filterParams={filterParams} setBreadCrumps={setBreadCrumps}/>
    </div>
  );
};

export default CatProdSidebar;
