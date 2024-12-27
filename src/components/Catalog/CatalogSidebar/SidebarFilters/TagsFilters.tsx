import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { ArrowIcon } from '@/shared/ui/icons';

function TagsFilters({ filters, setFilters }) {
  const handleCheckboxChange = (tagSelected) => {
    const currentState = JSON.parse(JSON.stringify(filters));

    const tag = currentState.basics.tags.find((tag) => tag.tag === tagSelected);
    tag.is_selected = !tag.is_selected;

    currentState.lastChanged = {
      type: 'basics',
      filter: 'tags',
    };
    setFilters(currentState);
  };

  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        padding: 0,
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
        <span className="font-semibold text-colBlack">Статус</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        {filters?.basics?.tags?.map((el, index) => (
          <div className={!el?.is_active ? 'opacity-40' : null} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: '#15765B',
                    padding: '5px',
                  }}
                  checked={
                    filters?.basics?.tags?.find((tag) => tag?.tag === el?.tag)
                      .is_selected
                  }
                  disabled={!el?.is_active}
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
  );
}

export default TagsFilters;
