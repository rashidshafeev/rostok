import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFiltersOfProductsQuery } from "../../../../../redux/api/productEndpoints";
import SidebarFiltersSkeleton from "./SidebarFiltersSkeleton";
import CTextField from "../../../../../helpers/CustomInputs/CTextField";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { IOSSwitch } from "../../../../Favorites/styledComponents/IOSSwitch";
import { ArrowIcon } from "../../../../../helpers/Icons";

function SidebarFilters({ handleFetchByFilter, setOpen, filterParams, setBreadCrumps}) {


  const { categoryId } = useParams();

  const {
    data: filters,
    isLoading: filtersIsLoading,
    isSuccess: filtersIsSuccess,
  } = useGetFiltersOfProductsQuery({
    categoryId,
    filterParams,
  });

//   const [accordion, setAccordion] = useState({
//     parent: null,
//     child: null,
//     childLast: null,
//   });


  const [filtersState, setFiltersState] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: Number(filters?.basics?.price?.min),
    max_price: Number(filters?.basics?.price?.max),
  });
  const [sliderValue, setSliderValue] = useState([
    filtersState.min_price,
    filtersState.max_price,
  ]);

  const handleSliderChangeCommitted = () => {
    const [newMinPrice, newMaxPrice] = sliderValue;

    const updatedFilters = {
      ...filtersState,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersState(updatedFilters);
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersState,
      [name]: filtersState[name]?.includes(value)
        ? filtersState[name].filter((item) => item !== value)
        : [...(filtersState[name] || []), value],
    };

    if (
      updatedFilters[name].length === 0 &&
      filters?.dynamics?.some((el) => el?.id === name)
    ) {
      delete updatedFilters[name];
    }

    setFiltersState(updatedFilters);
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleChange = (name, value) => {
    let updatedFilters = { ...filtersState };

    if (name === "min_price" && parseInt(value) > filtersState.max_price) {
      updatedFilters = {
        ...updatedFilters,
        min_price: parseInt(value),
        max_price: parseInt(value),
      };
    } else if (
      name === "max_price" &&
      parseInt(value) < filtersState.min_price
    ) {
      updatedFilters = {
        ...updatedFilters,
        max_price: parseInt(value),
        min_price: parseInt(value),
      };
    } else {
      updatedFilters = {
        ...updatedFilters,
        [name]: value,
      };
    }

    setFiltersState(updatedFilters);
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: filters?.basics?.price?.min,
      max_price: filters?.basics?.price?.max,
    };
    handleFetchByFilter(categoryId, initialFiltersState);
    setFiltersState(initialFiltersState);
  };

  const toggleAccordion = (type, id) => {
    setAccordion((prevState) => ({
      ...prevState,
      [type]: prevState[type] === id ? null : id,
    }));
  };

  useEffect(() => {
    setBreadCrumps(filters?.category_chain);
  }, [filters?.category_chain]);

  useEffect(() => {
    const minPrice = filters?.basics?.price?.current_values
      ? filters?.basics?.price?.current_values?.min
      : filters?.basics?.price?.min;

    const maxPrice = filters?.basics?.price?.current_values
      ? filters?.basics?.price?.current_values?.max
      : filters?.basics?.price?.max;

    setFiltersState((prev) => ({
      ...prev,
      min_price: Number(minPrice),
      max_price: Number(maxPrice),
    }));
    setSliderValue([Number(minPrice), Number(maxPrice)]);
  }, [filters?.basics?.price]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <>
      {filtersIsLoading && <SidebarFiltersSkeleton />}
      {!filtersIsLoading && filtersIsSuccess && (
        <div className="sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2">
          {filters?.basics?.price && (
            <Accordion
              sx={{
                boxShadow: "none",
                padding: 0,
                margin: 0,
                border: "none",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">Цена, ₽</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <div className="grid grid-cols-2 gap-3 pb-3">
                  <CTextField
                    label={`от ${filters?.basics?.price?.min}`}
                    name="min_price"
                    type="number"
                    value={Number(filtersState?.min_price)}
                    onChange={(e) => handleChange("min_price", e.target.value)}
                  />
                  <CTextField
                    label={`до ${filters?.basics?.price?.max}`}
                    name="max_price"
                    type="number"
                    value={Number(filtersState?.max_price)}
                    onChange={(e) => handleChange("max_price", e.target.value)}
                  />
                </div>
                <Box>
                  <Slider
                    sx={{ color: "#15765B" }}
                    size="small"
                    getAriaLabel={() => "Price range"}
                    value={sliderValue}
                    min={filters?.basics?.price?.min}
                    max={filters?.basics?.price?.max}
                    onChange={handleSliderChange}
                    onChangeCommitted={handleSliderChangeCommitted}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
          {filters?.basics?.brands?.length > 0 && (
            <Accordion
              sx={{
                margin: "0",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                style={{ minHeight: 0, padding: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">
                  Производитель
                </span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {filters?.basics?.brands?.map((el) => (
                  <div className={!el?.is_active && "opacity-40"} key={el?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: "#15765B",
                            padding: "5px",
                          }}
                          name="brands"
                          checked={filtersState.brands.includes(el?.id)}
                          disabled={!el?.is_active}
                          onChange={() =>
                            handleCheckboxChange("brands", el?.id)
                          }
                        />
                      }
                      label={
                        <p className="text-sm font-medium text-colBlack">
                          {el?.name}
                        </p>
                      }
                    />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {filters?.basics?.tags?.length > 0 && (
            <Accordion
              sx={{
                boxShadow: "none",
                padding: 0,
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0 }}
                style={{ minHeight: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">Статус</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {filters?.basics?.tags?.map((el, index) => (
                  <div className={!el?.is_active && "opacity-40"} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: "#15765B",
                            padding: "5px",
                          }}
                          checked={filtersState.tags.includes(el?.tag)}
                          disabled={!el?.is_active}
                          onChange={() => handleCheckboxChange("tags", el?.tag)}
                        />
                      }
                      label={
                        <span
                          style={{
                            color: el?.text_color,
                            backgroundColor: el?.background_color,
                          }}
                          className="py-1 px-2 uppercase text-xs font-bold rounded-xl"
                        >
                          {el?.tag}
                        </span>
                      }
                    />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          {filters?.dynamics?.length > 0 &&
            filters?.dynamics?.map((el, index) => (
              <div key={index}>
                <Accordion
                  sx={{
                    boxShadow: "none",
                    padding: 0,
                  }}
                  defaultExpanded
                >
                  <AccordionSummary
                    sx={{ padding: 0 }}
                    style={{ minHeight: 0 }}
                    expandIcon={
                      <ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />
                    }
                  >
                    <p className="font-semibold text-colBlack line-clamp-2 break-all leading-[120%]">
                      {el?.name}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, marginLeft: "-8px" }}>
                    <div className="max-h-40 overflow-hidden overflow-y-scroll scrollable2">
                      {el?.values?.map((val) => (
                        <div
                          className={!val?.is_active && "opacity-40"}
                          key={val?.id}
                        >
                          <FormControlLabel
                            sx={{ margin: "0" }}
                            control={
                              <Checkbox
                                style={{
                                  color: "#15765B",
                                  padding: "5px",
                                }}
                                name={el?.name}
                                checked={
                                  filtersState[el?.id]?.includes(val?.id) ||
                                  false
                                }
                                disabled={!val?.is_active}
                                onChange={() =>
                                  handleCheckboxChange(el?.id, val?.id)
                                }
                              />
                            }
                            label={
                              <div className="flex items-center">
                                {el?.type === "color" && val?.second_color && (
                                  <>
                                    <span
                                      style={{
                                        backgroundColor: val?.color,
                                      }}
                                      className={`min-w-[10px] min-h-[20px]  rounded-tl-full rounded-bl-full ${
                                        val?.color === "#FFFFFF"
                                          ? " border-l border-colGray"
                                          : ""
                                      }`}
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: val?.second_color,
                                      }}
                                      className={`min-w-[10px] min-h-[20px]  rounded-tr-full rounded-br-full ${
                                        val?.second_color === "#FFFFFF"
                                          ? " border-r border-colGray"
                                          : ""
                                      }`}
                                    ></span>
                                  </>
                                )}
                                {el?.type === "color" && !val?.second_color && (
                                  <span
                                    style={{
                                      backgroundColor: val?.color,
                                    }}
                                    className={`min-w-[20px] min-h-[20px] rounded-full ${
                                      val?.color === "#FFFFFF"
                                        ? "border border-colGray"
                                        : ""
                                    }`}
                                  ></span>
                                )}
                                <p className="text-sm font-medium text-colBlack line-clamp-1 break-all ml-1">
                                  {val?.text}
                                </p>
                              </div>
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
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
            onClick={handleClearFilters}
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
