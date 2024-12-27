import React from 'react';

import { ArrowIcon } from '@helpers/Icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

function BrandsFilter({ filters, setFilters }) {
  const handleCheckboxChange = (brandId) => {
    const currentState = JSON.parse(JSON.stringify(filters));

    const brand = currentState.basics.brands.find(
      (brand) => brand.id === brandId
    );
    brand.is_selected = !brand.is_selected;

    setFilters(currentState);
  };

  return (
    <Accordion
      sx={{
        margin: '0',
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
      defaultExpanded
      disableGutters
    >
      <AccordionSummary
        sx={{ padding: 0, flexDirection: 'row-reverse', gap: '8px' }}
        style={{ minHeight: 0 }}
        expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
      >
        <span className="font-semibold text-colBlack">Бренд</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <div className="max-h-40 overflow-hidden overflow-y-scroll scrollable2 flex flex-col gap-1">
          {filters?.basics?.brands?.map((el) => (
            <div className={!el?.is_active ? 'opacity-40' : null} key={el?.id}>
              <FormControlLabel
                sx={{ margin: '0', display: 'flex', alignItems: 'start' }}
                control={
                  <Checkbox
                    style={{
                      color: '#15765B',
                      padding: '0',
                    }}
                    name="brands"
                    // checked={filters.basics?.brands.includes(el?.id)}
                    checked={
                      filters?.basics?.brands?.find(
                        (brand) => brand?.id === el?.id
                      ).is_selected
                    }
                    disabled={!el?.is_active}
                    onChange={() => handleCheckboxChange(el?.id)}
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
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default BrandsFilter;
