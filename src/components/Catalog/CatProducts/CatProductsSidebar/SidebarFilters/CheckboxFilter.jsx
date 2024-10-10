import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { ArrowIcon } from "../../../../../helpers/Icons";
import TooltipCaption from "./TooltipCaption";

function CheckboxFilter({ filter, filters, changeFilters, setFilters }) {
  console.log("filters");
  console.log(filter);
  const handleCheckboxChange = (filterId, valueId) => {
    const currentState = JSON.parse(JSON.stringify(filters));

      const filter = currentState.dynamics.find(
        (filter) => filter.id === filterId
      );
      const value = filter.values.find((value) => value.id === valueId);
      value.is_selected = !value.is_selected;

      currentState.lastChanged = {
        type: "dynamics",
        filter: filterId
      };
      setFilters(currentState);
  }

  // const handleCheckboxChange = (filterId, valueId) => {
  //   const params = new URLSearchParams(location.search);
  // console.log(params);
  //   // Get the current selected values for the filter from the URL
  //   const currentValues = params.get(`filter_${filterId}`)?.split(',') || [];
  
  //   // Toggle the selected value in the list
  //   const valueIndex = currentValues.indexOf(valueId.toString());
  
  //   if (valueIndex > -1) {
  //     // Value is already selected, remove it
  //     currentValues.splice(valueIndex, 1);
  //   } else {
  //     // Value is not selected, add it
  //     currentValues.push(valueId.toString());
  //   }
  //   console.log("currentValues");
  //   console.log(currentValues);
  
  //   // Update or remove the filter in the search params based on selected values
  //   if (currentValues.length > 0) {
  //     params.set(`filter_${filterId}`, currentValues.join(','));
  //   } else {
  //     params.delete(`filter_${filterId}`);
  //   }
  
  //   // Update the URL with the new search parameters
  //   navigate(`${location.pathname}?${params.toString()}`);
  // };
  
  const checkCloseToWhite = (color) => {
    if (!color) return

    const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
    return r > 200 && g > 200 && b > 200;
  }
 

  return (
    <div key={filter?.id}>
      <Accordion
        sx={{
          boxShadow: "none",
          padding: 0,
        }}
        defaultExpanded
        disableGutters
      >
        <AccordionSummary
          sx={{ padding: 0, flexDirection: 'row-reverse', gap: "8px" }}
          style={{ minHeight: 0 }}
          expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
        >
          <p className="font-semibold text-colBlack line-clamp-2 break-all leading-[120%]">
            {filter?.name}
          </p>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, marginLeft: "-8px" }}>
          <div className="max-h-40 overflow-hidden overflow-y-scroll scrollable2 flex flex-col gap-1">
            {filter?.values?.map((val) =>{ 
            //  console.log(val.is_active);
            return (
              <div className={!val?.is_active && "opacity-40"} key={val?.id}>
                <FormControlLabel
                  sx={{ margin: "0", display: "flex", alignItems: "start" }}
                  control={
                    <Checkbox
                      style={{
                        color: "#15765B",
                        padding: "0 5px",
                      }}
                      name={filter?.name}
                      // checked={
                      //   filtersState[el?.id]?.includes(val?.id) ||
                      //   false
                      // }
                      checked={
                        filters?.dynamics
                          ?.find((el) => el?.id === filter?.id)
                          ?.values?.find((el) => el?.id === val?.id)
                          ?.is_selected || false
                      }
                      // disabled={!val?.is_active}
                      disabled={
                        !filters?.dynamics
                          ?.find((el) => el?.id === filter?.id)
                          ?.values?.find((el) => el?.id === val?.id)
                          ?.is_active || false
                      }
                      onChange={() => handleCheckboxChange(filter?.id, val?.id)}
                    />
                  }
                  label={
                    <div className="flex items-center" data-title={val?.text}>
                      {filter?.type === "color" && val?.second_color && (
                        <>
                          <span
                            style={{
                              backgroundColor: val?.color,
                            }}
                            className={`min-w-[10px] min-h-[20px]  rounded-tl-full rounded-bl-full ${
                              checkCloseToWhite(val?.color)
                                ? " border-l border-colGray"
                                : ""
                            }`}
                          ></span>
                          <span
                            style={{
                              backgroundColor: val?.second_color,
                            }}
                            className={`min-w-[10px] min-h-[20px]  rounded-tr-full rounded-br-full ${
                              checkCloseToWhite(val?.second_color)
                                ? " border-r border-colGray"
                                : ""
                            }`}
                          ></span>
                        </>
                      )}
                      {filter?.type === "color" && !val?.second_color && (
                        <span
                          style={{
                            backgroundColor: val?.color,
                          }}
                          className={`min-w-[20px] min-h-[20px] rounded-full ${
                            checkCloseToWhite(val?.color)
                              ? "border border-colGray"
                              : ""
                          }`}
                        ></span>
                      )}
                      <p className="text-sm font-medium text-colBlack line-clamp-2 break-words ml-1">
                        {val?.text}
                        {/* <TooltipCaption text={val?.text} tooltipText={val?.text}/> */}
                      </p>
                    </div>
                  }
                />
              </div>
            )})}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CheckboxFilter;
