import React, { useEffect, useState } from "react";
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

function BrandsFilter({ filters, setFilters }) {

  const handleCheckboxChange = (brandId) => {
    const currentState = JSON.parse(JSON.stringify(filters));

    const brand = currentState.basics.brands.find(
      (brand) => brand.id === brandId
    );
    brand.is_selected = !brand.is_selected;

    currentState.lastChanged = {
      type: "basics",
      filter: "brands",
    };
    setFilters(currentState);
  };

  return (
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
        <span className="font-semibold text-colBlack">Производитель</span>
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
                  // checked={filters.basics?.brands.includes(el?.id)}
                  checked={
                    filters?.basics?.brands?.find(
                      (brand) => brand?.id === el?.id
                    ).is_selected
                  }
                  disabled={!el?.is_active}
                  onChange={() =>
                    handleCheckboxChange(el?.id)
                  }
                />
              }
              label={
                <p className="text-sm font-medium text-colBlack">{el?.name}</p>
              }
            />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default BrandsFilter;