import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { toggleTagsFilterValue } from '../../../../../../redux/slices/filterSlice';

function TagsFilters({ filters }) {

  const dispatch = useDispatch();

  const handleCheckboxChange = (value) => {
    dispatch(toggleTagsFilterValue(value));
  }


  return (
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
                          // checked={filters?.basics?.tags?.includes(el?.tag)}
                          checked={filters?.basics?.tags?.find(tag => tag?.tag === el?.tag).is_selected}
                          disabled={!el?.is_active}
                          // onChange={() => handleCheckboxChange("tags", el?.tag)}
                          onChange={() => handleCheckboxChange(el?.tag)}
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
  )
}

export default TagsFilters