import { memo } from 'react';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { ArrowIcon } from '@/shared/ui/icons';

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const FilterGroup = memo(
  ({
    title,
    children,
    defaultExpanded = true,
    className = '',
  }: FilterGroupProps) => {
    return (
      <Accordion
        defaultExpanded={defaultExpanded}
        className={className}
        sx={{
          boxShadow: 'none',
          '&:before': { display: 'none' },
          margin: 0,
        }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
          sx={{ padding: 0, flexDirection: 'row-reverse', gap: '8px' }}
        >
          <span className="font-semibold text-colBlack">{title}</span>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
      </Accordion>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';
