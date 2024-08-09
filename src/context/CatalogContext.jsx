// src/context/ModalContext.js

import React, { createContext, useContext, useState } from 'react';

// Define the context with default values
const CatalogContext = createContext({
  filtersContext: {},
  sortContext: {},
  setFiltersContext: () => {},
  setSortContext: () => {},
});

// Create a provider component
export const CatalogProvider = ({ children }) => {
    const [filtersContext, setFiltersContext] = useState({});
    const [sortContext, setSortContext] = useState({});

  const setFilters = (filters) => {
    setFiltersContext(filters);
  }

  const setSort = (sort) => {
    setSortContext(sort);
  }

  console.log("context log", filtersContext, sortContext);

  return (
    <CatalogContext.Provider value={{ filtersContext, sortContext, setFilters, setSort }}>
      {children}
    </CatalogContext.Provider>
  );
};

// Custom hook for using the modal context
export const useFilters = () => useContext(CatalogContext);
