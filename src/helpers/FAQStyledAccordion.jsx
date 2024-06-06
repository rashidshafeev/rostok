import React from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
    padding: 1,
    dropShadow: 'none',
    boxShadow: 'none',
    // minHeight: 0,
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    'margin': 0,
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: 'lightgrey',
  '&.Mui-expanded': {
    borderRadius: '8px 8px 0 0',
    // minHeight: '64px',
  },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  borderRadius: '0 0 8px 8px',
}));

