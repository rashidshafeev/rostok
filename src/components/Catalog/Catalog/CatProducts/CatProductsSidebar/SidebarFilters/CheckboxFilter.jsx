import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";

import { ArrowIcon } from "../../../../../../helpers/Icons";
import CTextField from "../../../../../../helpers/CustomInputs/CTextField";
import { useFilters } from "../../../../../../context/CatalogContext";
import { useDispatch } from "react-redux";
import { toggleDynamicFilterCheckbox } from "../../../../../../redux/slices/filterSlice";
useCallback
function CheckboxFilter({ filter, filters, changeFilters, setFilters }) {

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

 

  return (
    <div key={filter?.id}>
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
          <p className="font-semibold text-colBlack line-clamp-2 break-all leading-[120%]">
            {filter?.name}
          </p>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, marginLeft: "-8px" }}>
          <div className="max-h-40 overflow-hidden overflow-y-scroll scrollable2">
            {filter?.values?.map((val) =>{ 
            //  console.log(val.is_active);
            return (
              <div className={!val?.is_active && "opacity-40"} key={val?.id}>
                <FormControlLabel
                  sx={{ margin: "0" }}
                  control={
                    <Checkbox
                      style={{
                        color: "#15765B",
                        padding: "5px",
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
                    <div className="flex items-center">
                      {filter?.type === "color" && val?.second_color && (
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
                      {filter?.type === "color" && !val?.second_color && (
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
            )})}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CheckboxFilter;