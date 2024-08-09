import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetFiltersMutation,
  useGetFiltersOfProductsQuery,
} from "../../../../../../redux/api/productEndpoints";
import SidebarFiltersSkeleton from "../SidebarFiltersSkeleton";
import CTextField from "../../../../../../helpers/CustomInputs/CTextField";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { IOSSwitch } from "../../../../../Favorites/styledComponents/IOSSwitch";
import { ArrowIcon } from "../../../../../../helpers/Icons";
import { useFilters } from "../../../../../../context/CatalogContext";
import PriceFilter from "./PriceFilter";
import BrandsFilter from "./BrandsFilter";
import DynamicFilters from "./DynamicFilters";
import { setFilters as setFiltersStore, setIsLoading } from "../../../../../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import TagsFilters from "./TagsFilters";

// function SidebarFilters({ handleFetchByFilter, setOpen, filterParams, setBreadCrumps}) {
function SidebarFilters({ handleFetchByFilter, setOpen, filterParams }) {
  // const [filters, setFilters] = useState({});
  // const { filtersContext, sortContext, setFilters: setFiltersContext, setSort: setSortContext} = useFilters()
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const [
    getFilters,
    { isLoading: filtersIsLoading, isSuccess: filtersIsSuccess },
  ] = useGetFiltersMutation();

  const filters = useSelector((state) => state?.filter.filters);
  const sort = useSelector((state) => state?.filter.sort);
  const isLoading = useSelector((state) => state?.filter.isLoading);
  console.log(filters);
  const previousFilters = useRef(filters);
  

  const getNewFiltersList = async () => {
    const brands = filters?.basics?.brands?.reduce((acc, brand) => {
      if (brand.is_selected) {
        acc.push(brand.id);
      }
      return acc;
    }, []);

    const tags = filters?.basics?.tags?.reduce((acc, tag) => {
      console.log(tag)
      if (tag.is_selected) {
        acc.push(tag.tag);
      }
      return acc;
    }, [])

    const dynamicFilters = filters?.dynamics?.filter(filter => filter.values.some(value => value.is_selected))
    .reduce((acc, filter) => {
      acc[filter.id] = filter.values
      .filter(value => value.is_selected) // Filter out non-selected values
      .map(value => value.id); // Extract the ids of the selected values
      return acc;
    }, {});

    
    const newFilters = await getFilters({
      category_id: categoryId,
      min_price: filters?.basics?.price?.min,
      max_price: filters?.basics?.price?.max,
      // min_raiting (float): минимальный рейтинг
      // max_raiting (float): максимальный рейтинг
      brands: brands,
      tags: tags,
      filters: dynamicFilters,

      // orderBy (string): Сортировка по полю
      // sortOrder (string): Направление сортировки
      last_changed: filters?.lastChanged

    });


    if (newFilters.data.success === 'ok') {
      const currentFilters = {
        basics: newFilters.data.basics,
        dynamics: newFilters.data.dynamics,
      };
      
      // if (JSON.stringify(currentFilters) !== JSON.stringify(filters)) {
        dispatch(setFiltersStore(currentFilters));
        dispatch(setIsLoading(false))
      // }
    }
    
  }

  useEffect(() => {
    if (JSON.stringify(previousFilters.current) !== JSON.stringify(filters)) {
      previousFilters.current = filters;
      getNewFiltersList();
    }
  }, [filters]);

  return (
    <>
      {isLoading && <SidebarFiltersSkeleton />}
      {!isLoading && (
        // {filtersIsLoading && <SidebarFiltersSkeleton />}
        // {!filtersIsLoading && filtersIsSuccess && (
        <div className="sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2">
          {filters?.basics?.price && <PriceFilter filters={filters} />}
          {filters?.basics?.brands?.length > 0 && (
            <BrandsFilter filters={filters} />
          )}
          {filters?.basics?.tags?.length > 0 && (
            <TagsFilters filters={filters} />
          )}
          {filters?.dynamics?.length > 0 && (
            <DynamicFilters filters={filters} />
          )}
          <FormControlLabel
            sx={{ margin: "10px 0" }}
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                defaultChecked
                onChange={(e) => handleChange("highRating", e.target.checked)}
              />
            }
            labelPlacement="start"
            label={
              <p className="text-sm font-semibold text-colBlack">
                Высокий рейтинг
              </p>
            }
          />
          {filters?.more?.length > 0 && (
            <button
              onClick={() => setOpen(true)}
              className="bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none"
            >
              Все фильтры
            </button>
          )}
          <span
            // onClick={handleClearFilters}
            className="text-colDarkGray font-semibold flex justify-center cursor-pointer"
          >
            Очистить фильтр
          </span>
        </div>
      )}
    </>
  );
}

export default SidebarFilters;
